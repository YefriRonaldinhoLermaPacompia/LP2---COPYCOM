package com.example.copicom.service.impl;

import com.example.copicom.dto.TrabajadorDto;
import com.example.copicom.entity.Trabajador;
import com.example.copicom.mapper.TrabajadorMapper;
import com.example.copicom.repository.TrabajadorRepository;
import com.example.copicom.service.TrabajadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrabajadorServiceImpl implements TrabajadorService {

    private final TrabajadorRepository repository;
    private final TrabajadorMapper mapper;

    @Override
    public TrabajadorDto create(TrabajadorDto dto) {
        Trabajador saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public TrabajadorDto update(Long id, TrabajadorDto dto) {
        Trabajador entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Trabajador no encontrado"));
        entity.setNombres(dto.getNombres());
        entity.setDni(dto.getDni());
        entity.setCelular(dto.getCelular());
        entity.setCorreo(dto.getCorreo());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public TrabajadorDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Trabajador no encontrado"));
    }

    @Override
    public List<TrabajadorDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}

