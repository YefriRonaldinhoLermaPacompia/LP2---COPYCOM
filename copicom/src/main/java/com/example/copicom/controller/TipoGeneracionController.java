package com.example.copicom.controller;

import com.example.copicom.dto.TipoGeneracionDto;
import com.example.copicom.service.TipoGeneracionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tipos-generacion")
@RequiredArgsConstructor
public class TipoGeneracionController {

    private final TipoGeneracionService service;

    @GetMapping
    public List<TipoGeneracionDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public TipoGeneracionDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<TipoGeneracionDto> create(@Valid @RequestBody TipoGeneracionDto dto) {
        TipoGeneracionDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/tipos-generacion/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public TipoGeneracionDto update(@PathVariable Long id, @Valid @RequestBody TipoGeneracionDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
