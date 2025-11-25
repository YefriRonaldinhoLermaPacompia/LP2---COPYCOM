package com.example.copicom.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteDto {
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String nombres;

    @NotBlank
    @Size(max = 100)
    private String apellidos;

    @Size(max = 45)
    private String dni;

    @Size(max = 255)
    private String direccion;

    @Size(max = 45)
    private String telefono;

    @Size(max = 45)
    private String ruc;

    @Email
    @Size(max = 145)
    private String correo;

    private Long usuarioId;
}
