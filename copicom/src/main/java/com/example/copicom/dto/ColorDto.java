package com.example.copicom.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ColorDto {
    private Long id;

    @NotBlank
    @Size(max = 45)
    private String nombreColor;

    private BigDecimal precioColor;
}
