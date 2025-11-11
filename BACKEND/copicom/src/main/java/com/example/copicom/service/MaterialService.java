package com.example.copicom.service;

import com.example.copicom.dto.MaterialDto;

import java.util.List;

public interface MaterialService {
    MaterialDto create(MaterialDto dto);
    MaterialDto update(Long id, MaterialDto dto);
    void delete(Long id);
    MaterialDto getById(Long id);
    List<MaterialDto> list();
}
