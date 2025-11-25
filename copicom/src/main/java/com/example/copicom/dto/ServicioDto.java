package com.example.copicom.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioDto {
    private Long id;

    @NotBlank
    @Size(max = 45)
    private String nombreServicio;

    private String descripcion;

    private BigDecimal precioUnitario;

    private Integer cantidad;

    private Long tamanoId;
    private Long colorId;
    private Long materialId;
    private Long acabadoId;
    private Long tipoGeneracionId;
}
