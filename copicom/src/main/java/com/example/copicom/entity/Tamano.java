package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tamano")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tamano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String nombreTamano;

    @Column(precision = 10, scale = 2)
    private BigDecimal precioTamano;
}
