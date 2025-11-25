package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "detalle_pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"pedido"})
@ToString(exclude = {"pedido"})
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false,
            foreignKey = @ForeignKey(name = "FK_detalle_pedido"))
    private Pedido pedido;

    @Column(name = "servicio_id", nullable = false)
    private Long servicioId;

    @Column(name = "trabajador_id", nullable = false)
    private Long trabajadorId;

    @Column(name = "maquina_id", nullable = false)
    private Long maquinaId;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unitario", precision = 10, scale = 2, nullable = false)
    private BigDecimal precioUnitario;

    @Column(name = "subtotal", precision = 10, scale = 2, nullable = false)
    private BigDecimal subtotal;

    @Column(name = "multiplicador", precision = 4, scale = 2)
    private BigDecimal multiplicador;

    @Column(name = "costo_adicional", precision = 10, scale = 2)
    private BigDecimal costoAdicional;

    // Método para calcular subtotal automáticamente
    public void calcularSubtotal() {
        if (cantidad != null && precioUnitario != null) {
            BigDecimal base = precioUnitario.multiply(BigDecimal.valueOf(cantidad));
            if (multiplicador != null && multiplicador.compareTo(BigDecimal.ZERO) > 0) {
                base = base.multiply(multiplicador);
            }
            if (costoAdicional != null) {
                base = base.add(costoAdicional);
            }
            this.subtotal = base;
        }
    }
}
