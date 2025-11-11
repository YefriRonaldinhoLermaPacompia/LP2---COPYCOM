package com.example.copicom.service;

import com.example.copicom.dto.ClienteDto;

import java.util.List;

public interface ClienteService {
    ClienteDto create(ClienteDto dto);
    ClienteDto update(Long id, ClienteDto dto);
    void delete(Long id);
    ClienteDto getById(Long id);
    List<ClienteDto> list();
}
