package com.example.copicom.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "ventas")
@EqualsAndHashCode(exclude = "detalles")
@ToString(exclude = "detalles")
public class VentaEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La fecha no puede ser nula")
    @Column(nullable = false)
    private LocalDateTime fecha;

    @NotNull(message = "El total no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El total debe ser mayor a 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(length = 500)
    private String observaciones;

    @Column(nullable = false, length = 50)
    private String estado = "COMPLETADA"; // COMPLETADA, CANCELADA, PENDIENTE


    private Integer numeroFactura;
    private String serie;

    // Relación One-to-Many con VentaDetalle
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<VentaDetalleEntity> detalles = new ArrayList<>();


    // Relación One-to-Many con VentaDetalle
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Pago> pagos = new ArrayList<>();

    // Relación Many-to-One con Cliente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false,
            foreignKey = @ForeignKey(name = "FK_venta_cliente"))
    @NotNull(message = "La cliente no puede ser nula")
    private Cliente cliente;

    @Column(nullable = false)
    private Date fechaCreacion;
    private Date fechaModificacion;

    @PrePersist
    private void beforePersist() {
        this.fechaCreacion = new Date();
        this.fechaModificacion = new Date();
        this.fecha = LocalDateTime.now();
      //  this.serie = "F001";

    }

    @PreUpdate
    private void beforeUpdate() {
        this.fechaModificacion = new Date();
    }

    // Métodos de conveniencia para manejar la relación bidireccional
    public void addDetalle(VentaDetalleEntity detalle) {
        detalles.add(detalle);
        detalle.setVenta(this);
    }


    // Métodos de conveniencia para manejar la relación bidireccional
    public void addPagos(Pago pago) {
        pagos.add(pago);
        pago.setVenta(this);
    }
    public void removeDetalle(VentaDetalleEntity detalle) {
        detalles.remove(detalle);
        detalle.setVenta(null);
    }

    // Constructor que establece fecha actual
    public VentaEntity() {
        this.fecha = LocalDateTime.now();
    }
}