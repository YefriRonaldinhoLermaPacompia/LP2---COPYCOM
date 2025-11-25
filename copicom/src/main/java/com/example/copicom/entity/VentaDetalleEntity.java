package com.example.copicom.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "venta_detalles")
@EqualsAndHashCode(exclude = {"venta"})
@ToString(exclude = {"venta"})
public class VentaDetalleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La cantidad no puede ser nula")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    @Column(nullable = false)
    private Integer cantidad;

    @NotNull(message = "El precio unitario no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El precio unitario debe ser mayor a 0")
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @NotNull(message = "El subtotal no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El subtotal debe ser mayor a 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    // Relación Many-to-One con Venta
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id", nullable = false,
            foreignKey = @ForeignKey(name = "FK_venta_detalle_venta"))
    @NotNull(message = "La venta no puede ser nula")
    private VentaEntity venta;

    // Relación Many-to-One con Servicio
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servicio_id", nullable = false,
            foreignKey = @ForeignKey(name = "FK_venta_detalle_servicio"))
    @NotNull(message = "El servicio no puede ser nulo")
    private Servicio servicio;

    // Método para calcular subtotal automáticamente
    public void calcularSubtotal() {
        if (cantidad != null && precioUnitario != null) {
            this.subtotal = precioUnitario.multiply(BigDecimal.valueOf(cantidad));
        }
    }

    // Constructor que calcula el subtotal
    public VentaDetalleEntity() {
    }

    public VentaDetalleEntity(Integer cantidad, BigDecimal precioUnitario, Servicio servicio) {
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.servicio = servicio;
        calcularSubtotal();
    }
}