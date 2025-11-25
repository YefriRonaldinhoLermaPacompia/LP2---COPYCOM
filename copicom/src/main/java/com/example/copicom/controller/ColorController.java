package com.example.copicom.controller;

import com.example.copicom.dto.ColorDto;
import com.example.copicom.service.ColorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/colores")
@RequiredArgsConstructor
public class ColorController {

    private final ColorService service;

    @GetMapping
    public List<ColorDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public ColorDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<ColorDto> create(@Valid @RequestBody ColorDto dto) {
        ColorDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/colores/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ColorDto update(@PathVariable Long id, @Valid @RequestBody ColorDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
