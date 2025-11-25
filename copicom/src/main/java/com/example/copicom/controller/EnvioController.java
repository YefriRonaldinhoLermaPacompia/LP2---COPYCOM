package com.example.copicom.controller;

import com.example.copicom.dto.EnvioDto;
import com.example.copicom.service.EnvioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/envios")
@RequiredArgsConstructor
public class EnvioController {

    private final EnvioService service;

    @GetMapping
    public List<EnvioDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public EnvioDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<EnvioDto> create(@Valid @RequestBody EnvioDto dto) {
        EnvioDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/envios/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public EnvioDto update(@PathVariable Long id, @Valid @RequestBody EnvioDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

