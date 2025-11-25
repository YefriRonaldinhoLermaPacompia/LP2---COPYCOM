package com.example.copicom.controller;

import com.example.copicom.dto.AcabadoDto;
import com.example.copicom.service.AcabadoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/acabados")
@RequiredArgsConstructor
public class AcabadoController {

    private final AcabadoService service;

    @GetMapping
    public List<AcabadoDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public AcabadoDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<AcabadoDto> create(@Valid @RequestBody AcabadoDto dto) {
        AcabadoDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/acabados/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public AcabadoDto update(@PathVariable Long id, @Valid @RequestBody AcabadoDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
