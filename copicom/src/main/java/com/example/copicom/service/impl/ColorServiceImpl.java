package com.example.copicom.service.impl;

import com.example.copicom.dto.ColorDto;
import com.example.copicom.entity.Color;
import com.example.copicom.mapper.ColorMapper;
import com.example.copicom.repository.ColorRepository;
import com.example.copicom.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {

    private final ColorRepository repository;
    private final ColorMapper mapper;

    @Override
    public ColorDto create(ColorDto dto) {
        Color saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public ColorDto update(Long id, ColorDto dto) {
        Color entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Color no encontrado"));
        entity.setNombreColor(dto.getNombreColor());
        entity.setPrecioColor(dto.getPrecioColor());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ColorDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Color no encontrado"));
    }

    @Override
    public List<ColorDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
