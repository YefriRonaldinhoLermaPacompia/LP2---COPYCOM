package com.example.copicom.service.impl;

import com.example.copicom.dto.MaterialDto;
import com.example.copicom.entity.Material;
import com.example.copicom.mapper.MaterialMapper;
import com.example.copicom.repository.MaterialRepository;
import com.example.copicom.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository repository;
    private final MaterialMapper mapper;

    @Override
    public MaterialDto create(MaterialDto dto) {
        Material saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public MaterialDto update(Long id, MaterialDto dto) {
        Material entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Material no encontrado"));
        entity.setNombreMaterial(dto.getNombreMaterial());
        entity.setPrecioMaterialUnitario(dto.getPrecioMaterialUnitario());
        entity.setCantidadServicioPedido(dto.getCantidadServicioPedido());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public MaterialDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Material no encontrado"));
    }

    @Override
    public List<MaterialDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
