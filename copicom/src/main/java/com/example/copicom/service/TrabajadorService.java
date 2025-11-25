package com.example.copicom.service;

import com.example.copicom.dto.TrabajadorDto;

import java.util.List;

public interface TrabajadorService {
    TrabajadorDto create(TrabajadorDto dto);
    TrabajadorDto update(Long id, TrabajadorDto dto);
    void delete(Long id);
    TrabajadorDto getById(Long id);
    List<TrabajadorDto> list();
}

