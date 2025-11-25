package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trabajador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trabajador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nombres;

    @Column(length = 45, nullable = false)
    private String dni;

    @Column(length = 45)
    private String celular;

    @Column(length = 100)
    private String correo;

}
