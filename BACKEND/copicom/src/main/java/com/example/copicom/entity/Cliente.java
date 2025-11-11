package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nombres;

    @Column(length = 100, nullable = false)
    private String apellidos;

    @Column(length = 45)
    private String dni;

    @Column(length = 255)
    private String direccion;

    @Column(length = 45)
    private String telefono;

    @Column(length = 45)
    private String ruc;

    @Column(length = 145)
    private String correo;

    @Column(name = "usuario_id")
    private Long usuarioId;
}
