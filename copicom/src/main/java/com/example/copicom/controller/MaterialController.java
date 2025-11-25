package com.example.copicom.controller;

import com.example.copicom.dto.MaterialDto;
import com.example.copicom.service.MaterialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/materiales")
@RequiredArgsConstructor
public class MaterialController {

    private final MaterialService service;

    @GetMapping
    public List<MaterialDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public MaterialDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<MaterialDto> create(@Valid @RequestBody MaterialDto dto) {
        MaterialDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/materiales/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public MaterialDto update(@PathVariable Long id, @Valid @RequestBody MaterialDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
