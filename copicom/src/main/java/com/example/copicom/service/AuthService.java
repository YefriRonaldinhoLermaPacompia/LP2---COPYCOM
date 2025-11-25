package com.example.copicom.service;


import com.example.copicom.dto.JwtResponseDTO;
import com.example.copicom.dto.LoginRequestDTO;
import com.example.copicom.dto.RegisterRequestDTO;

public interface AuthService {
    JwtResponseDTO authenticateUser(LoginRequestDTO loginRequest);
    String registerUser(RegisterRequestDTO registerRequest);
    boolean isUsernameAvailable(String username);
    boolean isEmailAvailable(String email);
}

