package com.example.copicom.utils;

import com.example.copicom.entity.RolEntity;
import com.example.copicom.entity.UsuarioEntity;
import com.example.copicom.repository.RolRepository;
import com.example.copicom.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Order(2)
public class UsuarioSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        if (usuarioRepository.count() == 0) {

            // Buscar rol ADMIN
            RolEntity rolAdmin = rolRepository.findByNombre("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("No existe ROLE_ADMIN"));

            Set<RolEntity> rolesAdmin = new HashSet<>();
            rolesAdmin.add(rolAdmin);

            UsuarioEntity admin = new UsuarioEntity();
            admin.setUsername("admin");
            admin.setEmail("admin@sisventas.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // contraseña segura
            admin.setNombre("Super");
            admin.setApellido("Administrador");
            admin.setActivo(true);
            admin.setRoles(rolesAdmin);

            usuarioRepository.save(admin);

            System.out.println(">>> Usuario administrador creado correctamente.");
        }
    }
}
