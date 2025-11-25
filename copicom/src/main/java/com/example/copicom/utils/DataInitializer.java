package com.example.copicom.utils;

import com.example.copicom.entity.RolEntity;
import com.example.copicom.repository.RolRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Carga los roles por defecto al iniciar la aplicación
 */
@Component
public class DataInitializer {


    @Autowired
    private RolRepository rolRepository;


    @PostConstruct
    public void init() {
        createRoleIfNotExists("ROLE_ADMIN", "Administrador del sistema");
        createRoleIfNotExists("ROLE_USER", "Usuario estándar del sistema");
        createRoleIfNotExists("ROLE_VENDEDOR", "Usuario con permisos de venta");
    }


    private void createRoleIfNotExists(String nombre, String descripcion) {
        rolRepository.findByNombre(nombre).orElseGet(() -> {
            RolEntity rol = new RolEntity();
            rol.setNombre(nombre);
            rol.setDescripcion(descripcion);
            rolRepository.save(rol);
            System.out.println("✅ Rol creado: " + nombre);
            return rol;
        });
    }
}
