package com.example.copicom.service.impl;

import com.example.copicom.dto.TipoGeneracionDto;
import com.example.copicom.entity.TipoGeneracion;
import com.example.copicom.mapper.TipoGeneracionMapper;
import com.example.copicom.repository.TipoGeneracionRepository;
import com.example.copicom.service.TipoGeneracionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoGeneracionServiceImpl implements TipoGeneracionService {

    private final TipoGeneracionRepository repository;
    private final TipoGeneracionMapper mapper;

    @Override
    public TipoGeneracionDto create(TipoGeneracionDto dto) {
        TipoGeneracion saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public TipoGeneracionDto update(Long id, TipoGeneracionDto dto) {
        TipoGeneracion entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tipo de Generación no encontrado"));
        entity.setNombreTipoGeneracion(dto.getNombreTipoGeneracion());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public TipoGeneracionDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Tipo de Generación no encontrado"));
    }

    @Override
    public List<TipoGeneracionDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
