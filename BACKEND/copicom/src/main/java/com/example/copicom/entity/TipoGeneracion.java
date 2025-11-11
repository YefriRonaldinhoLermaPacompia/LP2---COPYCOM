package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo_generacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoGeneracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String nombreTipoGeneracion;
}
