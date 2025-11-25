package com.example.copicom.service.impl;

import com.example.copicom.dto.AcabadoDto;
import com.example.copicom.entity.Acabado;
import com.example.copicom.mapper.AcabadoMapper;
import com.example.copicom.repository.AcabadoRepository;
import com.example.copicom.service.AcabadoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcabadoServiceImpl implements AcabadoService {

    private final AcabadoRepository repository;
    private final AcabadoMapper mapper;

    @Override
    public AcabadoDto create(AcabadoDto dto) {
        Acabado saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public AcabadoDto update(Long id, AcabadoDto dto) {
        Acabado entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Acabado no encontrado"));
        entity.setNombreAcabado(dto.getNombreAcabado());
        entity.setPrecioAcabado(dto.getPrecioAcabado());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public AcabadoDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Acabado no encontrado"));
    }

    @Override
    public List<AcabadoDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
