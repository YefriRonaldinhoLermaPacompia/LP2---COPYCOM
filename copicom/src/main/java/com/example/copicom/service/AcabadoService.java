package com.example.copicom.service;

import com.example.copicom.dto.AcabadoDto;

import java.util.List;

public interface AcabadoService {
    AcabadoDto create(AcabadoDto dto);
    AcabadoDto update(Long id, AcabadoDto dto);
    void delete(Long id);
    AcabadoDto getById(Long id);
    List<AcabadoDto> list();
}
