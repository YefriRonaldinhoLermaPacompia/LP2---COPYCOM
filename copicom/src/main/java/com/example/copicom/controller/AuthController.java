package com.example.copicom.controller;

import com.example.copicom.dto.JwtResponseDTO;
import com.example.copicom.dto.LoginRequestDTO;
import com.example.copicom.dto.RegisterRequestDTO;
import com.example.copicom.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Controlador para manejo de autenticación (login y registro)
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private AuthService authService;


    /**
     * Endpoint de inicio de sesión
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        JwtResponseDTO jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }


    /**
     * Endpoint de registro de usuario
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO registerRequest) {
        String message = authService.registerUser(registerRequest);
        return ResponseEntity.ok(message);
    }


    /**
     * Verificar disponibilidad de username
     */
    @GetMapping("/check-username/{username}")
    public ResponseEntity<Boolean> checkUsername(@PathVariable String username) {
        boolean available = authService.isUsernameAvailable(username);
        return ResponseEntity.ok(available);
    }


    /**
     * Verificar disponibilidad de email
     */
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        boolean available = authService.isEmailAvailable(email);
        return ResponseEntity.ok(available);
    }
}

