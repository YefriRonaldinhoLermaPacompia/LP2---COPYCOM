package com.example.copicom.repository;

import com.example.copicom.entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    List<Servicio> findByNombreServicioContainingIgnoreCase(String nombre);
}
