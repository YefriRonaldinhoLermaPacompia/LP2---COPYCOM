package com.example.copicom.dto;


import lombok.Data;

import java.util.Set;


/**
 * DTO para las solicitudes de registro de usuario
 * Se utiliza en /api/auth/register
 */
@Data
public class RegisterRequestDTO {


    private String username;
    private String email;
    private String password;
    private String nombre;
    private String apellido;


    // Lista de roles opcionales (ejemplo: ["admin", "vendedor"])
    private Set<String> roles;
}

