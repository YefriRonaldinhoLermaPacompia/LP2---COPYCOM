package com.example.copicom.controller;

import com.example.copicom.dto.ServicioDto;
import com.example.copicom.service.ServicioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/servicios")
@RequiredArgsConstructor
public class ServicioController {

    private final ServicioService service;

    @GetMapping
    public List<ServicioDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public ServicioDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/buscar")
    public List<ServicioDto> buscar(@RequestParam String filtro) {
        return service.buscarPorNombre(filtro);
    }

    @PostMapping
    public ResponseEntity<ServicioDto> create(@Valid @RequestBody ServicioDto dto) {
        ServicioDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/servicios/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ServicioDto update(@PathVariable Long id, @Valid @RequestBody ServicioDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
