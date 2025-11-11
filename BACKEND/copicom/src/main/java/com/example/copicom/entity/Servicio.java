package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "servicio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false)
    private String nombreServicio;

    @Lob
    private String descripcion;

    @Column(precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    private Integer cantidad;

    @Column(name = "tamano_id")
    private Long tamanoId;

    @Column(name = "color_id")
    private Long colorId;

    @Column(name = "material_id")
    private Long materialId;

    @Column(name = "acabado_id")
    private Long acabadoId;

    @Column(name = "tipo_generacion_id")
    private Long tipoGeneracionId;


}
