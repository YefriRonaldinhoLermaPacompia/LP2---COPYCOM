package com.example.copicom.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrabajadorDto {
    private Long id;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(max = 100, message = "Los nombres no pueden exceder 100 caracteres")
    private String nombres;

    @NotBlank(message = "El DNI es obligatorio")
    @Size(max = 45, message = "El DNI no puede exceder 45 caracteres")
    private String dni;

    @Size(max = 45, message = "El celular no puede exceder 45 caracteres")
    private String celular;

    @Email(message = "El correo debe ser válido")
    @Size(max = 100, message = "El correo no puede exceder 100 caracteres")
    private String correo;

    private Long usuarioId;
}

