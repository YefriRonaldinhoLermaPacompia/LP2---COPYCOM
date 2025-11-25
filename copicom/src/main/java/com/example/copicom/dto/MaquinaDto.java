package com.example.copicom.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaquinaDto {
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 45, message = "El nombre no puede exceder 45 caracteres")
    private String nombreMaquina;

    @Size(max = 255)
    private String descripcion;

    private LocalDateTime fechaUltMantenimiento;

    @NotNull(message = "El tipo de maquinaria es obligatorio")
    private Long tipoMaquinariaId;
}

