package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "acabado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Acabado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String nombreAcabado;

    @Column(precision = 10, scale = 2)
    private BigDecimal precioAcabado;
}
