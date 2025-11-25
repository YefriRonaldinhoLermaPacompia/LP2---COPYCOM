package com.example.copicom.service.impl;

import com.example.copicom.dto.PagoDto;
import com.example.copicom.entity.Pago;
import com.example.copicom.entity.VentaEntity;
import com.example.copicom.mapper.PagoMapper;
import com.example.copicom.repository.PagoRepository;
import com.example.copicom.repository.VentaRepository;
import com.example.copicom.service.PagoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoServiceImpl implements PagoService {

    private final PagoRepository repository;
    private final PagoMapper mapper;
    private final VentaRepository ventaRepository;

    @Override
    @Transactional
    public PagoDto create(PagoDto dto) {
        if (dto.getVentaId() == null) {
            throw new IllegalArgumentException("La venta es obligatoria");
        }

        VentaEntity venta = ventaRepository.findById(dto.getVentaId())
                .orElseThrow(() -> new EntityNotFoundException("Venta no encontrada"));

        Pago pago = mapper.toEntity(dto);
        pago.setVenta(venta);
        
        if (pago.getFechaPago() == null) {
            pago.setFechaPago(java.time.LocalDateTime.now());
        }

        Pago saved = repository.save(pago);
        return mapper.toDto(saved);
    }

    @Override
    @Transactional
    public PagoDto update(Long id, PagoDto dto) {
        Pago pago = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pago no encontrado"));

        pago.setModo(dto.getModo());
        pago.setMonto(dto.getMonto());
        if (dto.getFechaPago() != null) {
            pago.setFechaPago(dto.getFechaPago());
        }

        // Actualizar venta si cambió
        if (dto.getVentaId() != null && !dto.getVentaId().equals(pago.getVenta().getId())) {
            VentaEntity venta = ventaRepository.findById(dto.getVentaId())
                    .orElseThrow(() -> new EntityNotFoundException("Venta no encontrada"));
            pago.setVenta(venta);
        }

        return mapper.toDto(repository.save(pago));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public PagoDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Pago no encontrado"));
    }

    @Override
    public List<PagoDto> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    @Override
    public List<PagoDto> obtenerPagosPorVenta(Long ventaId) {
        return repository.findByVentaId(ventaId).stream()
                .map(mapper::toDto)
                .toList();
    }
}

