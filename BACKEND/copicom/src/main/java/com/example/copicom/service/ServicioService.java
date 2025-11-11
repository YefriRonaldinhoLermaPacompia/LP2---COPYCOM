package com.example.copicom.service;

import com.example.copicom.dto.ServicioDto;

import java.util.List;

public interface ServicioService {
    ServicioDto create(ServicioDto dto);
    ServicioDto update(Long id, ServicioDto dto);
    void delete(Long id);
    ServicioDto getById(Long id);
    List<ServicioDto> list();
}
