package com.example.copicom.service.impl;

import com.example.copicom.dto.TamanoDto;
import com.example.copicom.entity.Tamano;
import com.example.copicom.mapper.TamanoMapper;
import com.example.copicom.repository.TamanoRepository;
import com.example.copicom.service.TamanoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TamanoServiceImpl implements TamanoService {

    private final TamanoRepository repository;
    private final TamanoMapper mapper;

    @Override
    public TamanoDto create(TamanoDto dto) {
        Tamano saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public TamanoDto update(Long id, TamanoDto dto) {
        Tamano entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tamaño no encontrado"));
        entity.setNombreTamano(dto.getNombreTamano());
        entity.setPrecioTamano(dto.getPrecioTamano());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public TamanoDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Tamaño no encontrado"));
    }

    @Override
    public List<TamanoDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
