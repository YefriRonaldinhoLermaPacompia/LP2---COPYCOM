package com.example.copicom.service.impl;

import com.example.copicom.dto.PagosDTO;
import com.example.copicom.dto.VentaDTO;
import com.example.copicom.dto.VentaDetalleDTO;
import com.example.copicom.entity.Cliente;
import com.example.copicom.entity.Pago;
import com.example.copicom.entity.Servicio;
import com.example.copicom.entity.VentaDetalleEntity;
import com.example.copicom.entity.VentaEntity;
import com.example.copicom.mapper.VentaMapper;
import com.example.copicom.repository.ServicioRepository;
import com.example.copicom.repository.VentaRepository;
import com.example.copicom.service.VentaService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VentaServiceImpl implements VentaService {
    @Autowired
    private VentaRepository ventaRepository;
    @Autowired
    private VentaMapper ventaMapper;
    @Autowired
    private ServicioRepository productoRepository;

    @Override
    public List<VentaDTO> listar() {
        List<VentaEntity> ventaEntities = ventaRepository.findAll();
        List<VentaDTO> ventaDTOS = new ArrayList<>();
        for (VentaEntity venta : ventaEntities) {
            VentaDTO ventaDTO = ventaMapper.ventaToVentaDTO(venta);
            ventaDTOS.add(ventaDTO);
        }
        return ventaDTOS;
    }

    @Transactional
    @Override
    public VentaDTO guardar(VentaDTO ventaDTO) {
        if (ventaDTO.getDetalles() == null || ventaDTO.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("La venta debe tener al menos un detalle");
        }

        // Crear la venta principal
        VentaEntity venta = new VentaEntity();
        venta.setFecha(ventaDTO.getFecha() != null ? ventaDTO.getFecha() : LocalDateTime.now());
        venta.setObservaciones(ventaDTO.getObservaciones());
        venta.setEstado(ventaDTO.getEstado() != null ? ventaDTO.getEstado() : "COMPLETADA");
        venta.setSerie(ventaDTO.getSerie());
        Cliente cliente = new Cliente();
        cliente.setId(ventaDTO.getClienteId());
        venta.setCliente(cliente);
        BigDecimal totalCalculado = BigDecimal.ZERO;

        for (PagosDTO pagosDTO : ventaDTO.getPagos()) {
            Pago pagosEntity = new Pago();
            pagosEntity.setModo(pagosDTO.getModo());
            pagosEntity.setMonto(pagosDTO.getMonto());
            pagosEntity.setFechaPago(LocalDateTime.now()); // <--- asignar fecha actual
            venta.addPagos(pagosEntity);
        }

        // Procesar cada detalle
        for (VentaDetalleDTO detalleDTO : ventaDTO.getDetalles()) {

            System.out.println("=================================");
            System.out.println(detalleDTO.toString());
            // Verificar que el producto existe y tiene stock suficiente
            Servicio producto = productoRepository.findById(detalleDTO.getServicioId())
                    .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado: " + detalleDTO.getServicioId()));

            // Verificar stock disponible
            if (producto.getCantidad() < detalleDTO.getCantidad()) {
                throw new IllegalArgumentException("Stock insuficiente para el producto: " + producto.getNombreServicio() +
                        ". Stock disponible: " + producto.getCantidad() + ", solicitado: " + detalleDTO.getCantidad());
            }

            // Crear el detalle
            VentaDetalleEntity detalle = new VentaDetalleEntity();
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(detalleDTO.getPrecioUnitario() != null ?
                    detalleDTO.getPrecioUnitario() : producto.getPrecioUnitario());
            detalle.setServicio(producto);
            detalle.calcularSubtotal();

            // Agregar a la venta
            venta.addDetalle(detalle);

            // Actualizar stock del producto
            producto.setCantidad(producto.getCantidad() - detalleDTO.getCantidad());
            productoRepository.save(producto);

            // Acumular total
            totalCalculado = totalCalculado.add(detalle.getSubtotal());
        }

        // Establecer total calculado o usar el proporcionado
        venta.setTotal(ventaDTO.getTotal() != null ? ventaDTO.getTotal() : totalCalculado);
        List<VentaEntity> ventaEntities = ventaRepository.findAll();
        venta.setNumeroFactura(ventaEntities.size() + 1);
        // Guardar la venta (cascade guarda los detalles)
        VentaEntity ventaGuardada = ventaRepository.save(venta);

        return ventaMapper.ventaToVentaDTO(ventaGuardada);
    }

    @Override
    public VentaDTO actualizarVenta(Long id, VentaDTO ventaDTO) {
        VentaEntity venta = ventaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Venta no encontrada"));

        venta.setEstado(ventaDTO.getEstado());
        venta.setFecha(ventaDTO.getFecha() != null ? ventaDTO.getFecha() : LocalDateTime.now());
        venta.setObservaciones(ventaDTO.getObservaciones());
        venta.setEstado(ventaDTO.getEstado() != null ? ventaDTO.getEstado() : "COMPLETADA");
        venta.setSerie(ventaDTO.getSerie());

        BigDecimal totalCalculado = BigDecimal.ZERO;

        // Procesar cada detalle
        for (VentaDetalleDTO detalleDTO : ventaDTO.getDetalles()) {

            System.out.println("=================================");
            System.out.println(detalleDTO.toString());
            // Verificar que el producto existe y tiene stock suficiente
            Servicio producto = productoRepository.findById(detalleDTO.getServicioId())
                    .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado: " + detalleDTO.getServicioId()));

            // Verificar stock disponible
            if (producto.getCantidad() < detalleDTO.getCantidad()) {
                throw new IllegalArgumentException("Stock insuficiente para el producto: " + producto.getNombreServicio() +
                        ". Stock disponible: " + producto.getCantidad() + ", solicitado: " + detalleDTO.getCantidad());
            }

            // Crear el detalle
            VentaDetalleEntity detalle = new VentaDetalleEntity();
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(detalleDTO.getPrecioUnitario() != null ?
                    detalleDTO.getPrecioUnitario() : producto.getPrecioUnitario());
            detalle.setServicio(producto);
            detalle.calcularSubtotal();

            // Agregar a la venta
            venta.addDetalle(detalle);

            // Actualizar stock del producto
            producto.setCantidad(producto.getCantidad() - detalleDTO.getCantidad());
            productoRepository.save(producto);

            // Acumular total
            totalCalculado = totalCalculado.add(detalle.getSubtotal());
        }

        // Establecer total calculado o usar el proporcionado
        venta.setTotal(ventaDTO.getTotal() != null ? ventaDTO.getTotal() : totalCalculado);
        List<VentaEntity> ventaEntities = ventaRepository.findAll();
        venta.setNumeroFactura(ventaEntities.size() + 1);
        // Guardar la venta (cascade guarda los detalles)
        VentaEntity ventaGuardada = ventaRepository.save(venta);

        return ventaMapper.ventaToVentaDTO(ventaGuardada);
    }
}
