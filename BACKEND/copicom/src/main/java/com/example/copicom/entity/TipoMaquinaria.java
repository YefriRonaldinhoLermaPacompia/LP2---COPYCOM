package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo_maquinaria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoMaquinaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_tipo_maquinaria", length = 45, nullable = false)
    private String nombreTipoMaquinaria;
}
