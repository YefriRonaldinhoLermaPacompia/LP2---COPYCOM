package com.example.copicom.controller;

import com.example.copicom.dto.TrabajadorDto;
import com.example.copicom.service.TrabajadorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/trabajadores")
@RequiredArgsConstructor
public class TrabajadorController {

    private final TrabajadorService service;

    @GetMapping
    public List<TrabajadorDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public TrabajadorDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<TrabajadorDto> create(@Valid @RequestBody TrabajadorDto dto) {
        TrabajadorDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/trabajadores/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public TrabajadorDto update(@PathVariable Long id, @Valid @RequestBody TrabajadorDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

