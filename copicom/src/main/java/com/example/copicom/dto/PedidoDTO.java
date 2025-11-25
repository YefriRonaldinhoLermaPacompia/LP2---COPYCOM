package com.example.copicom.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PedidoDTO {
    private Long id;

    private LocalDateTime fechaPedido;

    @NotNull(message = "El total no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El total debe ser mayor a 0")
    private BigDecimal totalPedido;

    @Size(max = 500, message = "Las observaciones no pueden exceder los 500 caracteres")
    private String observaciones;

    private String estado; // PENDIENTE, EN_PRODUCCION, ENTREGADO, CANCELADO

    private String serie; // Serie del pedido
    private String numeroPedido; // Número del pedido

    private Long clienteId;
    private String clienteNombre;
    private String clienteDni;

    @Valid
    private List<DetallePedidoDTO> detalles = new ArrayList<>();

    private Long envioId;
    private Long pagoId;
}

