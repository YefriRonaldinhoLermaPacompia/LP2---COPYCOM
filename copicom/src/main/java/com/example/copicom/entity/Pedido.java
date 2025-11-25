package com.example.copicom.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"detalles", "cliente", "envio", "pago"})
@ToString(exclude = {"detalles", "cliente", "envio", "pago"})
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false,
            foreignKey = @ForeignKey(name = "FK_pedido_cliente"))
    @NotNull(message = "El cliente no puede ser nulo")
    private Cliente cliente;

    @Column(name = "fecha_pedido", nullable = false)
    private LocalDateTime fechaPedido;

    @NotNull(message = "El total no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El total debe ser mayor a 0")
    @Column(name = "total_pedido", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPedido;

    @Column(length = 500)
    private String observaciones;

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String estado = "PENDIENTE"; // PENDIENTE, EN_PRODUCCION, ENTREGADO, CANCELADO

    @Column(name = "serie", length = 20, unique = false)
    private String serie; // Serie del pedido (ej: "B001", "F001")

    @Column(name = "numero_pedido", length = 20, unique = false)
    private String numeroPedido; // Número del pedido (ej: "00001", "00002")

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<DetallePedido> detalles = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "envio_id", foreignKey = @ForeignKey(name = "FK_pedido_envio"))
    private Envio envio;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "pago_id", foreignKey = @ForeignKey(name = "FK_pedido_pago"))
    private Pago pago;

    @Column(name = "fecha_creacion", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;

    @Column(name = "fecha_modificacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaModificacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = new Date();
        fechaModificacion = new Date();
        if (fechaPedido == null) {
            fechaPedido = LocalDateTime.now();
        }
        if (estado == null) {
            estado = "PENDIENTE";
        }
        // Generar serie si no existe (por defecto "PED")
        if (serie == null || serie.isEmpty()) {
            serie = "PED";
        }
        // El número de pedido se generará después de guardar (en PostPersist o en el servicio)
    }


    @PreUpdate
    protected void onUpdate() {
        fechaModificacion = new Date();
    }

    // Métodos de conveniencia
    public void addDetalle(DetallePedido detalle) {
        detalles.add(detalle);
        detalle.setPedido(this);
        detalle.calcularSubtotal();
    }

    public void removeDetalle(DetallePedido detalle) {
        detalles.remove(detalle);
        detalle.setPedido(null);
    }
}
