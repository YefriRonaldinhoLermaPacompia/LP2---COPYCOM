package com.example.copicom.service;

import com.example.copicom.dto.PedidoDTO;

import java.util.List;

public interface PedidoService {
    List<PedidoDTO> listar();
    PedidoDTO guardar(PedidoDTO pedidoDTO);
    PedidoDTO actualizarPedido(Long id, PedidoDTO pedidoDTO);
    PedidoDTO actualizarEstado(Long id, String nuevoEstado);
    PedidoDTO getById(Long id);
    void delete(Long id);
    List<PedidoDTO> obtenerPedidosPorCliente(Long clienteId);
    List<PedidoDTO> buscarPorSerieYNumero(String serie, String numeroPedido);
    PedidoDTO buscarPorSerieYNumeroUnico(String serie, String numeroPedido);
}

