package com.example.copicom.controller;

import com.example.copicom.dto.TipoMaquinariaDto;
import com.example.copicom.service.TipoMaquinariaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tipos-maquinaria")
@RequiredArgsConstructor
public class TipoMaquinariaController {

    private final TipoMaquinariaService service;

    @GetMapping
    public List<TipoMaquinariaDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public TipoMaquinariaDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<TipoMaquinariaDto> create(@Valid @RequestBody TipoMaquinariaDto dto) {
        TipoMaquinariaDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/tipos-maquinaria/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public TipoMaquinariaDto update(@PathVariable Long id, @Valid @RequestBody TipoMaquinariaDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

