package com.example.copicom.dto;

import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnvioDto {
    private Long id;

    @Size(max = 50)
    private String numeroRastreo;

    @Size(max = 50)
    private String departamento;

    @Size(max = 50)
    private String provincia;

    @Size(max = 50)
    private String distrito;

    @Size(max = 255)
    private String direccionEnvio;

    @Size(max = 255)
    private String referencia;

    private LocalDateTime fechaEnvio;
    private LocalDate fechaEntrega;

    private BigDecimal costoEnvio;

    @Size(max = 50)
    private String codigoRastreo;
}

