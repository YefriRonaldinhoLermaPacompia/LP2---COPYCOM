package com.example.copicom.controller;

import com.example.copicom.dto.PedidoDTO;
import com.example.copicom.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<PedidoDTO>> listar() {
        return ResponseEntity.ok(pedidoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.getById(id));
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<PedidoDTO>> obtenerPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(pedidoService.obtenerPedidosPorCliente(clienteId));
    }

    @GetMapping("/rastrear")
    public ResponseEntity<PedidoDTO> rastrearPedido(
            @RequestParam String serie,
            @RequestParam String numero) {
        try {
            PedidoDTO pedido = pedidoService.buscarPorSerieYNumeroUnico(serie, numero);
            return ResponseEntity.ok(pedido);
        } catch (jakarta.persistence.EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<PedidoDTO>> buscarPedidos(
            @RequestParam(required = false) String serie,
            @RequestParam(required = false) String numero) {
        if (serie != null && numero != null) {
            return ResponseEntity.ok(pedidoService.buscarPorSerieYNumero(serie, numero));
        }
        return ResponseEntity.ok(pedidoService.listar());
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> crear(@Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO creado = pedidoService.guardar(pedidoDTO);
        return ResponseEntity.created(URI.create("/pedidos/" + creado.getId())).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> actualizar(@PathVariable Long id, @Valid @RequestBody PedidoDTO pedidoDTO) {
        return ResponseEntity.ok(pedidoService.actualizarPedido(id, pedidoDTO));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<PedidoDTO> actualizarEstado(@PathVariable Long id, @RequestBody EstadoRequest request) {
        return ResponseEntity.ok(pedidoService.actualizarEstado(id, request.getEstado()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Clase interna para el request de cambio de estado
    public static class EstadoRequest {
        private String estado;

        public String getEstado() {
            return estado;
        }

        public void setEstado(String estado) {
            this.estado = estado;
        }
    }
}

