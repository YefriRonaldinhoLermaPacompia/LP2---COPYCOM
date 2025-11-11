package com.example.copicom.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoGeneracionDto {
    private Long id;

    @NotBlank
    @Size(max = 45)
    private String nombreTipoGeneracion;
}
