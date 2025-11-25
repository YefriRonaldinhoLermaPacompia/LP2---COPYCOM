package com.example.copicom.service.impl;

import com.example.copicom.entity.UsuarioEntity;
import com.example.copicom.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/**
 * Servicio que carga los detalles del usuario desde la base de datos
 * para la autenticación de Spring Security.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsuarioEntity usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));


        return usuario; // UsuarioEntity implementa UserDetails
    }
}
