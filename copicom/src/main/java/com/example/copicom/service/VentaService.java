package com.example.copicom.service;

import com.example.copicom.dto.VentaDTO;

import java.util.List;

public interface VentaService {
    List<VentaDTO> listar();

    VentaDTO guardar(VentaDTO ventaDTO);
    VentaDTO actualizarVenta(Long id, VentaDTO ventaDTO);
}
