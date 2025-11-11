package com.example.copicom.service.impl;

import com.example.copicom.dto.ServicioDto;
import com.example.copicom.entity.Servicio;
import com.example.copicom.mapper.ServicioMapper;
import com.example.copicom.repository.ServicioRepository;
import com.example.copicom.service.ServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicioServiceImpl implements ServicioService {

    private final ServicioRepository repository;
    private final ServicioMapper mapper;

    @Override
    public ServicioDto create(ServicioDto dto) {
        Servicio saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public ServicioDto update(Long id, ServicioDto dto) {
        Servicio entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));
        entity.setNombreServicio(dto.getNombreServicio());
        entity.setDescripcion(dto.getDescripcion());
        entity.setPrecioUnitario(dto.getPrecioUnitario());
        entity.setCantidad(dto.getCantidad());
        entity.setTamanoId(dto.getTamanoId());
        entity.setColorId(dto.getColorId());
        entity.setMaterialId(dto.getMaterialId());
        entity.setAcabadoId(dto.getAcabadoId());
        entity.setTipoGeneracionId(dto.getTipoGeneracionId());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ServicioDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));
    }

    @Override
    public List<ServicioDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
