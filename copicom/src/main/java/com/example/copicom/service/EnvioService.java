package com.example.copicom.service;

import java.util.List;

import com.example.copicom.dto.EnvioDto;

public interface EnvioService {
    EnvioDto create(EnvioDto dto);
    EnvioDto update(Long id, EnvioDto dto);
    void delete(Long id);
    EnvioDto getById(Long id);
    List<EnvioDto> list();
}

