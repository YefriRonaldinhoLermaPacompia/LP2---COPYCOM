package com.example.copicom.service.impl;

import com.example.copicom.dto.ClienteDto;
import com.example.copicom.entity.Cliente;
import com.example.copicom.mapper.ClienteMapper;
import com.example.copicom.repository.ClienteRepository;
import com.example.copicom.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository repository;
    private final ClienteMapper mapper;

    @Override
    public ClienteDto create(ClienteDto dto) {
        Cliente saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    public ClienteDto update(Long id, ClienteDto dto) {
        Cliente entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
        entity.setNombres(dto.getNombres());
        entity.setApellidos(dto.getApellidos());
        entity.setDireccion(dto.getDireccion());
        entity.setTelefono(dto.getTelefono());
        entity.setRuc(dto.getRuc());
        entity.setCorreo(dto.getCorreo());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ClienteDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
    }

    @Override
    public List<ClienteDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }
}
