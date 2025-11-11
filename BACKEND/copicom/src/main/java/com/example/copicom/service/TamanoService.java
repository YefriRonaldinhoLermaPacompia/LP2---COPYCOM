package com.example.copicom.service;

import com.example.copicom.dto.TamanoDto;

import java.util.List;

public interface TamanoService {
    TamanoDto create(TamanoDto dto);
    TamanoDto update(Long id, TamanoDto dto);
    void delete(Long id);
    TamanoDto getById(Long id);
    List<TamanoDto> list();
}
