package com.example.copicom.service.impl;

import com.example.copicom.dto.EnvioDto;
import com.example.copicom.entity.Envio;
import com.example.copicom.mapper.EnvioMapper;
import com.example.copicom.repository.EnvioRepository;
import com.example.copicom.service.EnvioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnvioServiceImpl implements EnvioService {

    private final EnvioRepository repository;
    private final EnvioMapper mapper;

    @Override
    public EnvioDto create(EnvioDto dto) {
        Envio saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public EnvioDto update(Long id, EnvioDto dto) {
        Envio entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Envío no encontrado"));
        
        entity.setNumeroRastreo(dto.getNumeroRastreo());
        entity.setDepartamento(dto.getDepartamento());
        entity.setProvincia(dto.getProvincia());
        entity.setDistrito(dto.getDistrito());
        entity.setDireccionEnvio(dto.getDireccionEnvio());
        entity.setReferencia(dto.getReferencia());
        entity.setFechaEnvio(dto.getFechaEnvio());
        entity.setFechaEntrega(dto.getFechaEntrega());
        entity.setCostoEnvio(dto.getCostoEnvio());
        entity.setCodigoRastreo(dto.getCodigoRastreo());
        
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public EnvioDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Envío no encontrado"));
    }

    @Override
    public List<EnvioDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}

