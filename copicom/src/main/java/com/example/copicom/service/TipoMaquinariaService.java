package com.example.copicom.service;

import com.example.copicom.dto.TipoMaquinariaDto;

import java.util.List;

public interface TipoMaquinariaService {
    TipoMaquinariaDto create(TipoMaquinariaDto dto);
    TipoMaquinariaDto update(Long id, TipoMaquinariaDto dto);
    void delete(Long id);
    TipoMaquinariaDto getById(Long id);
    List<TipoMaquinariaDto> list();
}

