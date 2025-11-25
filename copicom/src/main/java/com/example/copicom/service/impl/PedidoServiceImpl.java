package com.example.copicom.service.impl;

import com.example.copicom.dto.DetallePedidoDTO;
import com.example.copicom.dto.PedidoDTO;
import com.example.copicom.entity.Cliente;
import com.example.copicom.entity.DetallePedido;
import com.example.copicom.entity.Envio;
import com.example.copicom.entity.Maquina;
import com.example.copicom.entity.Pago;
import com.example.copicom.entity.Pedido;
import com.example.copicom.entity.Servicio;
import com.example.copicom.entity.Trabajador;
import com.example.copicom.mapper.PedidoMapper;
import com.example.copicom.repository.ClienteRepository;
import com.example.copicom.repository.EnvioRepository;
import com.example.copicom.repository.MaquinaRepository;
import com.example.copicom.repository.PagoRepository;
import com.example.copicom.repository.PedidoRepository;
import com.example.copicom.repository.ServicioRepository;
import com.example.copicom.repository.TrabajadorRepository;
import com.example.copicom.service.PedidoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pedidoRepository;
    private final PedidoMapper pedidoMapper;
    private final ClienteRepository clienteRepository;
    private final ServicioRepository servicioRepository;
    private final TrabajadorRepository trabajadorRepository;
    private final MaquinaRepository maquinaRepository;
    private final EnvioRepository envioRepository;
    private final PagoRepository pagoRepository;

    @Override
    public List<PedidoDTO> listar() {
        return pedidoRepository.findAll().stream()
                .map(pedidoMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public PedidoDTO guardar(PedidoDTO pedidoDTO) {
        if (pedidoDTO.getDetalles() == null || pedidoDTO.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("El pedido debe tener al menos un detalle");
        }

        // Validar y obtener cliente
        Cliente cliente = clienteRepository.findById(pedidoDTO.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado"));

        // Crear el pedido
        Pedido pedido = new Pedido();
        pedido.setFechaPedido(pedidoDTO.getFechaPedido() != null ? pedidoDTO.getFechaPedido() : LocalDateTime.now());
        pedido.setObservaciones(pedidoDTO.getObservaciones());
        pedido.setEstado(pedidoDTO.getEstado() != null ? pedidoDTO.getEstado() : "PENDIENTE");
        pedido.setCliente(cliente);
        // Establecer serie y número si vienen en el DTO
        if (pedidoDTO.getSerie() != null && !pedidoDTO.getSerie().isEmpty()) {
            pedido.setSerie(pedidoDTO.getSerie());
        }
        if (pedidoDTO.getNumeroPedido() != null && !pedidoDTO.getNumeroPedido().isEmpty()) {
            pedido.setNumeroPedido(pedidoDTO.getNumeroPedido());
        }

        BigDecimal totalCalculado = BigDecimal.ZERO;

        // Procesar cada detalle
        for (DetallePedidoDTO detalleDTO : pedidoDTO.getDetalles()) {
            // Validar servicio
            Servicio servicio = servicioRepository.findById(detalleDTO.getServicioId())
                    .orElseThrow(() -> new EntityNotFoundException("Servicio no encontrado: " + detalleDTO.getServicioId()));

            // Validar trabajador
            Trabajador trabajador = trabajadorRepository.findById(detalleDTO.getTrabajadorId())
                    .orElseThrow(() -> new EntityNotFoundException("Trabajador no encontrado: " + detalleDTO.getTrabajadorId()));

            // Validar máquina
            Maquina maquina = maquinaRepository.findById(detalleDTO.getMaquinaId())
                    .orElseThrow(() -> new EntityNotFoundException("Máquina no encontrada: " + detalleDTO.getMaquinaId()));

            // Obtener IDs validados
            Long servicioId = servicio.getId();
            Long trabajadorId = trabajador.getId();
            Long maquinaId = maquina.getId();
            
            if (servicioId == null || trabajadorId == null || maquinaId == null) {
                throw new IllegalArgumentException("Los IDs de servicio, trabajador y máquina no pueden ser nulos");
            }

            // Crear el detalle
            Integer cantidadDTO = detalleDTO.getCantidad();
            Integer cantidad = (cantidadDTO != null) ? cantidadDTO : 1;
            BigDecimal precioUnitario = detalleDTO.getPrecioUnitario();
            if (precioUnitario == null) {
                BigDecimal precioServicio = servicio.getPrecioUnitario();
                precioUnitario = precioServicio != null ? precioServicio : BigDecimal.ZERO;
            }
            
            DetallePedido detalle = DetallePedido.builder()
                    .servicioId(servicioId)
                    .trabajadorId(trabajadorId)
                    .maquinaId(maquinaId)
                    .cantidad(cantidad)
                    .precioUnitario(precioUnitario)
                    .multiplicador(detalleDTO.getMultiplicador())
                    .costoAdicional(detalleDTO.getCostoAdicional())
                    .build();

            // addDetalle ya calcula el subtotal automáticamente
            pedido.addDetalle(detalle);
            totalCalculado = totalCalculado.add(detalle.getSubtotal());
        }

        // Procesar envío si existe
        if (pedidoDTO.getEnvioId() != null) {
            Envio envio = envioRepository.findById(pedidoDTO.getEnvioId())
                    .orElseThrow(() -> new EntityNotFoundException("Envío no encontrado"));
            pedido.setEnvio(envio);
        }

        // Procesar pago si existe
        if (pedidoDTO.getPagoId() != null) {
            Pago pago = pagoRepository.findById(pedidoDTO.getPagoId())
                    .orElseThrow(() -> new EntityNotFoundException("Pago no encontrado"));
            pedido.setPago(pago);
        }

        // Establecer total
        pedido.setTotalPedido(pedidoDTO.getTotalPedido() != null ? pedidoDTO.getTotalPedido() : totalCalculado);

        // Establecer serie si no viene en el DTO
        if (pedido.getSerie() == null || pedido.getSerie().isEmpty()) {
            pedido.setSerie("PED");
        }

        // Guardar el pedido (cascade guarda los detalles)
        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        
        // Generar número de pedido si no existe (después de guardar para tener el ID)
        if (pedidoGuardado.getNumeroPedido() == null || pedidoGuardado.getNumeroPedido().isEmpty()) {
            pedidoGuardado.setNumeroPedido(String.format("%05d", pedidoGuardado.getId()));
            pedidoGuardado = pedidoRepository.save(pedidoGuardado);
        }
        
        return pedidoMapper.toDto(pedidoGuardado);
    }

    @Override
    @Transactional
    public PedidoDTO actualizarPedido(Long id, PedidoDTO pedidoDTO) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));

        // Actualizar datos básicos
        pedido.setFechaPedido(pedidoDTO.getFechaPedido() != null ? pedidoDTO.getFechaPedido() : pedido.getFechaPedido());
        pedido.setObservaciones(pedidoDTO.getObservaciones());
        if (pedidoDTO.getEstado() != null) {
            pedido.setEstado(pedidoDTO.getEstado());
        }

        // Actualizar serie y número si vienen en el DTO
        if (pedidoDTO.getSerie() != null && !pedidoDTO.getSerie().isEmpty()) {
            pedido.setSerie(pedidoDTO.getSerie());
        }
        if (pedidoDTO.getNumeroPedido() != null && !pedidoDTO.getNumeroPedido().isEmpty()) {
            pedido.setNumeroPedido(pedidoDTO.getNumeroPedido());
        }

        // Actualizar cliente si cambió
        if (pedidoDTO.getClienteId() != null && !pedidoDTO.getClienteId().equals(pedido.getCliente().getId())) {
            Cliente cliente = clienteRepository.findById(pedidoDTO.getClienteId())
                    .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado"));
            pedido.setCliente(cliente);
        }

        // Limpiar detalles anteriores si se proporcionan nuevos
        if (pedidoDTO.getDetalles() != null && !pedidoDTO.getDetalles().isEmpty()) {
            pedido.getDetalles().clear();
            BigDecimal totalCalculado = BigDecimal.ZERO;

            // Procesar nuevos detalles
            for (DetallePedidoDTO detalleDTO : pedidoDTO.getDetalles()) {
                Servicio servicio = servicioRepository.findById(detalleDTO.getServicioId())
                        .orElseThrow(() -> new EntityNotFoundException("Servicio no encontrado"));

                Trabajador trabajador = trabajadorRepository.findById(detalleDTO.getTrabajadorId())
                        .orElseThrow(() -> new EntityNotFoundException("Trabajador no encontrado"));

                Maquina maquina = maquinaRepository.findById(detalleDTO.getMaquinaId())
                        .orElseThrow(() -> new EntityNotFoundException("Máquina no encontrada"));

                // Obtener IDs validados
                Long servicioId = servicio.getId();
                Long trabajadorId = trabajador.getId();
                Long maquinaId = maquina.getId();
                
                if (servicioId == null || trabajadorId == null || maquinaId == null) {
                    throw new IllegalArgumentException("Los IDs de servicio, trabajador y máquina no pueden ser nulos");
                }

                Integer cantidadDTO = detalleDTO.getCantidad();
                Integer cantidad = (cantidadDTO != null) ? cantidadDTO : 1;
                BigDecimal precioUnitario = detalleDTO.getPrecioUnitario();
                if (precioUnitario == null) {
                    BigDecimal precioServicio = servicio.getPrecioUnitario();
                    precioUnitario = precioServicio != null ? precioServicio : BigDecimal.ZERO;
                }
                
                DetallePedido detalle = DetallePedido.builder()
                        .servicioId(servicioId)
                        .trabajadorId(trabajadorId)
                        .maquinaId(maquinaId)
                        .cantidad(cantidad)
                        .precioUnitario(precioUnitario)
                        .multiplicador(detalleDTO.getMultiplicador())
                        .costoAdicional(detalleDTO.getCostoAdicional())
                        .build();

                // addDetalle ya calcula el subtotal automáticamente
                pedido.addDetalle(detalle);
                totalCalculado = totalCalculado.add(detalle.getSubtotal());
            }

            pedido.setTotalPedido(totalCalculado);
        }

        Pedido pedidoActualizado = pedidoRepository.save(pedido);
        return pedidoMapper.toDto(pedidoActualizado);
    }

    @Override
    @Transactional
    public PedidoDTO actualizarEstado(Long id, String nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));

        // Validar transiciones de estado
        String estadoActual = pedido.getEstado();
        if (estadoActual.equals("CANCELADO") && !nuevoEstado.equals("CANCELADO")) {
            throw new IllegalArgumentException("No se puede cambiar el estado de un pedido cancelado");
        }

        pedido.setEstado(nuevoEstado);
        Pedido pedidoActualizado = pedidoRepository.save(pedido);
        return pedidoMapper.toDto(pedidoActualizado);
    }

    @Override
    public PedidoDTO getById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));
        return pedidoMapper.toDto(pedido);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));
        
        // Solo permitir eliminar pedidos pendientes o cancelados
        if (!pedido.getEstado().equals("PENDIENTE") && !pedido.getEstado().equals("CANCELADO")) {
            throw new IllegalArgumentException("Solo se pueden eliminar pedidos pendientes o cancelados");
        }
        
        pedidoRepository.deleteById(id);
    }

    @Override
    public List<PedidoDTO> obtenerPedidosPorCliente(Long clienteId) {
        return pedidoRepository.findByClienteId(clienteId).stream()
                .map(pedidoMapper::toDto)
                .toList();
    }

    @Override
    public List<PedidoDTO> buscarPorSerieYNumero(String serie, String numeroPedido) {
        return pedidoRepository.buscarPorSerieYNumero(serie, numeroPedido).stream()
                .map(pedidoMapper::toDto)
                .toList();
    }

    @Override
    public PedidoDTO buscarPorSerieYNumeroUnico(String serie, String numeroPedido) {
        List<Pedido> pedidos = pedidoRepository.buscarPorSerieYNumero(serie, numeroPedido);
        if (pedidos.isEmpty()) {
            throw new EntityNotFoundException("No se encontró un pedido con serie " + serie + " y número " + numeroPedido);
        }
        if (pedidos.size() > 1) {
            throw new IllegalArgumentException("Se encontraron múltiples pedidos con serie " + serie + " y número " + numeroPedido);
        }
        return pedidoMapper.toDto(pedidos.get(0));
    }
}

