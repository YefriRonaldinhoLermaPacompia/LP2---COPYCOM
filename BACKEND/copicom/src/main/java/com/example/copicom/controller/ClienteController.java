package com.example.copicom.controller;

import com.example.copicom.dto.ClienteDto;
import com.example.copicom.service.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService service;

    @GetMapping
    public List<ClienteDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public ClienteDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<ClienteDto> create(@Valid @RequestBody ClienteDto dto) {
        ClienteDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/clientes/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ClienteDto update(@PathVariable Long id, @Valid @RequestBody ClienteDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
