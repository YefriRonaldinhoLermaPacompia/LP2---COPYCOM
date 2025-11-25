package com.example.copicom.service.impl;

import com.example.copicom.dto.TipoMaquinariaDto;
import com.example.copicom.entity.TipoMaquinaria;
import com.example.copicom.mapper.TipoMaquinariaMapper;
import com.example.copicom.repository.TipoMaquinariaRepository;
import com.example.copicom.service.TipoMaquinariaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoMaquinariaServiceImpl implements TipoMaquinariaService {

    private final TipoMaquinariaRepository repository;
    private final TipoMaquinariaMapper mapper;

    @Override
    public TipoMaquinariaDto create(TipoMaquinariaDto dto) {
        TipoMaquinaria saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public TipoMaquinariaDto update(Long id, TipoMaquinariaDto dto) {
        TipoMaquinaria entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tipo de maquinaria no encontrado"));
        entity.setNombreTipoMaquinaria(dto.getNombreTipoMaquinaria());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public TipoMaquinariaDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Tipo de maquinaria no encontrado"));
    }

    @Override
    public List<TipoMaquinariaDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}

