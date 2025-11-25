package com.example.copicom.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoDto {
    private Long id;

    @NotBlank(message = "El modo de pago es obligatorio")
    private String modo; // EFECTIVO, TARJETA, TRANSFERENCIA, etc.

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto debe ser mayor a 0")
    private BigDecimal monto;

    private LocalDateTime fechaPago;

    private Long ventaId;
}

