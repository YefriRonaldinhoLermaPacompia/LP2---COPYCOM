package com.example.copicom.controller;

import com.example.copicom.dto.MaquinaDto;
import com.example.copicom.service.MaquinaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/maquinas")
@RequiredArgsConstructor
public class MaquinaController {

    private final MaquinaService service;

    @GetMapping
    public List<MaquinaDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public MaquinaDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<MaquinaDto> create(@Valid @RequestBody MaquinaDto dto) {
        MaquinaDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/maquinas/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public MaquinaDto update(@PathVariable Long id, @Valid @RequestBody MaquinaDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

