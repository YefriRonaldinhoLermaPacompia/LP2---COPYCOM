package com.example.copicom.service.impl;

import com.example.copicom.dto.MaquinaDto;
import com.example.copicom.entity.Maquina;
import com.example.copicom.mapper.MaquinaMapper;
import com.example.copicom.repository.MaquinaRepository;
import com.example.copicom.repository.TipoMaquinariaRepository;
import com.example.copicom.service.MaquinaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaquinaServiceImpl implements MaquinaService {

    private final MaquinaRepository repository;
    private final MaquinaMapper mapper;
    private final TipoMaquinariaRepository tipoMaquinariaRepository;

    @Override
    public MaquinaDto create(MaquinaDto dto) {
        // Validar que el tipo de maquinaria exista
        tipoMaquinariaRepository.findById(dto.getTipoMaquinariaId())
                .orElseThrow(() -> new IllegalArgumentException("Tipo de maquinaria no encontrado"));
        
        Maquina saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public MaquinaDto update(Long id, MaquinaDto dto) {
        Maquina entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Máquina no encontrada"));
        
        // Validar que el tipo de maquinaria exista
        tipoMaquinariaRepository.findById(dto.getTipoMaquinariaId())
                .orElseThrow(() -> new IllegalArgumentException("Tipo de maquinaria no encontrado"));
        
        entity.setNombreMaquina(dto.getNombreMaquina());
        entity.setDescripcion(dto.getDescripcion());
        entity.setFechaUltMantenimiento(dto.getFechaUltMantenimiento());
        entity.setTipoMaquinariaId(dto.getTipoMaquinariaId());
        
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public MaquinaDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Máquina no encontrada"));
    }

    @Override
    public List<MaquinaDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}

