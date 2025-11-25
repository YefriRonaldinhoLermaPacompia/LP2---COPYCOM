package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class RolEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true, length = 50)
    private String nombre;


    @Column(length = 200)
    private String descripcion;


    // Constructor auxiliar
    public RolEntity(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}