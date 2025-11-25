package com.example.copicom.controller;

import com.example.copicom.dto.VentaDTO;
import com.example.copicom.service.VentaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ventas")
public class VentaController {
    @Autowired
    private VentaService ventaService;

    @GetMapping
    public ResponseEntity<List<VentaDTO>> findAll() {
        return new ResponseEntity<>(ventaService.listar(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VentaDTO> save(@Valid @RequestBody VentaDTO ventaDTO) {
        return new ResponseEntity<>(ventaService.guardar(ventaDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VentaDTO> update(@PathVariable Long id, @Valid @RequestBody VentaDTO ventaDTO) {
        return new ResponseEntity<>(ventaService.actualizarVenta(id, ventaDTO), HttpStatus.OK);
    }
}
