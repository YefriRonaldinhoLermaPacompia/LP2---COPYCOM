package com.example.copicom.repository;

import com.example.copicom.entity.RolEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
public interface RolRepository extends JpaRepository<RolEntity, Long> {
    Optional<RolEntity> findByNombre(String nombre);
}

