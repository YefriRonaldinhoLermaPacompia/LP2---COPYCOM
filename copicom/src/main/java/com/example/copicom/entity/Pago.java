package com.example.copicom.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pago")
@EqualsAndHashCode(exclude = {"venta"})
@ToString(exclude = {"venta"})
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El modo de pago no puede ser nulo")
    @Column(nullable = false)
    private String modo;

    @DecimalMin(value = "0.01", message = "El monto debe ser mayor a 0")
    @Column(name = "monto", nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id", nullable = false,
            foreignKey = @ForeignKey(name = "FK_pagos_venta"))
    @NotNull(message = "La venta no puede ser nula")
    private VentaEntity venta;

    // NUEVO CAMPO: fecha del pago
    @Column(name = "fecha_pago", nullable = false)
    private LocalDateTime fechaPago;

    // Constructor por defecto
    public Pago() {
        // Establece la fecha actual automáticamente al crear la instancia
        this.fechaPago = LocalDateTime.now();
    }
}
