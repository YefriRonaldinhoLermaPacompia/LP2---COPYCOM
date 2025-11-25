package com.example.copicom.service;

import com.example.copicom.dto.PagoDto;

import java.util.List;

public interface PagoService {
    PagoDto create(PagoDto dto);
    PagoDto update(Long id, PagoDto dto);
    void delete(Long id);
    PagoDto getById(Long id);
    List<PagoDto> list();
    List<PagoDto> obtenerPagosPorVenta(Long ventaId);
}

