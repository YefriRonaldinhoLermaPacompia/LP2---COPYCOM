package com.example.copicom.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cliente_id", nullable = false)
    private Long clienteId;

    @Column(name = "fecha_pedido", nullable = false)
    private LocalDateTime fechaPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", length = 20, nullable = false)
    private PedidoEstado estado;

    @Column(name = "total_pedido", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPedido;

    @Column(name = "pago_id")
    private Long pagoId;

    @Column(name = "envio_id")
    private Long envioId;
}
