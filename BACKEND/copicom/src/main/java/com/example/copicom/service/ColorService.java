package com.example.copicom.service;

import com.example.copicom.dto.ColorDto;

import java.util.List;

public interface ColorService {
    ColorDto create(ColorDto dto);
    ColorDto update(Long id, ColorDto dto);
    void delete(Long id);
    ColorDto getById(Long id);
    List<ColorDto> list();
}
