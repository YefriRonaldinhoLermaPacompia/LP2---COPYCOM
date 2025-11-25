package com.example.copicom.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class DetallePedidoDTO {
    private Long id;

    @NotNull(message = "La cantidad no puede ser nula")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    private Integer cantidad;

    @NotNull(message = "El precio unitario no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El precio unitario debe ser mayor a 0")
    private BigDecimal precioUnitario;

    @NotNull(message = "El subtotal no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El subtotal debe ser mayor a 0")
    private BigDecimal subtotal;

    private Long servicioId;
    private String servicioNombre;

    @NotNull(message = "El trabajador es obligatorio")
    private Long trabajadorId;
    private String trabajadorNombre;

    @NotNull(message = "La máquina es obligatoria")
    private Long maquinaId;
    private String maquinaNombre;

    private BigDecimal multiplicador;
    private BigDecimal costoAdicional;
}

