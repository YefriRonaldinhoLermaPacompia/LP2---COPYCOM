package com.example.copicom.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class VentaDetalleDTO {

    private Long id;

    @NotNull(message = "La cantidad no puede ser nula")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    private Integer cantidad;

    @NotNull(message = "El precio unitario no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El precio unitario debe ser mayor a 0")
    private BigDecimal precioUnitario;

    @DecimalMin(value = "0.01", message = "El subtotal debe ser mayor a 0")
    private BigDecimal subtotal;

    // ID de la venta (para relación)
    private Long ventaId;

    // ID del producto (para relación)
    @NotNull(message = "El producto no puede ser nulo")
    private Long servicioId;

    // Información adicional del producto para mostrar en respuestas
    private String servicioNombre;
    private BigDecimal servicioPrecio;
}