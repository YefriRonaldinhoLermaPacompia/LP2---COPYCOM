package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "maquina")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Maquina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_maquina", length = 45, nullable = false)
    private String nombreMaquina;

    @Column(length = 255)
    private String descripcion;

    @Column(name = "fecha_ult_mantenimiento")
    private LocalDateTime fechaUltMantenimiento;

    @Column(name = "tipo_maquinaria_id", nullable = false)
    private Long tipoMaquinariaId;
}
