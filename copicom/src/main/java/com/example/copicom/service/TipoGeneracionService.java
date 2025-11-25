package com.example.copicom.service;

import com.example.copicom.dto.TipoGeneracionDto;

import java.util.List;

public interface TipoGeneracionService {
    TipoGeneracionDto create(TipoGeneracionDto dto);
    TipoGeneracionDto update(Long id, TipoGeneracionDto dto);
    void delete(Long id);
    TipoGeneracionDto getById(Long id);
    List<TipoGeneracionDto> list();
}
