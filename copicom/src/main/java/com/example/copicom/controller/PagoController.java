package com.example.copicom.controller;

import com.example.copicom.dto.PagoDto;
import com.example.copicom.service.PagoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService service;

    @GetMapping
    public List<PagoDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public PagoDto get(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/venta/{ventaId}")
    public List<PagoDto> obtenerPorVenta(@PathVariable Long ventaId) {
        return service.obtenerPagosPorVenta(ventaId);
    }

    @PostMapping
    public ResponseEntity<PagoDto> create(@Valid @RequestBody PagoDto dto) {
        PagoDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/pagos/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public PagoDto update(@PathVariable Long id, @Valid @RequestBody PagoDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

