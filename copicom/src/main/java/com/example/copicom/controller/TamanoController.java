package com.example.copicom.controller;

import com.example.copicom.dto.TamanoDto;
import com.example.copicom.service.TamanoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tamanos")
@RequiredArgsConstructor
public class TamanoController {

    private final TamanoService service;

    @GetMapping
    public List<TamanoDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public TamanoDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<TamanoDto> create(@Valid @RequestBody TamanoDto dto) {
        TamanoDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/tamanos/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public TamanoDto update(@PathVariable Long id, @Valid @RequestBody TamanoDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
