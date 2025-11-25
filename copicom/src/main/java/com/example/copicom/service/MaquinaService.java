package com.example.copicom.service;

import com.example.copicom.dto.MaquinaDto;

import java.util.List;

public interface MaquinaService {
    MaquinaDto create(MaquinaDto dto);
    MaquinaDto update(Long id, MaquinaDto dto);
    void delete(Long id);
    MaquinaDto getById(Long id);
    List<MaquinaDto> list();
}

