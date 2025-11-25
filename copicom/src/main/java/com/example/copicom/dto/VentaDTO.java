package com.example.copicom.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class VentaDTO {

    private Long id;

    private LocalDateTime fecha;

    @NotNull(message = "El total no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El total debe ser mayor a 0")
    private BigDecimal total;
    private BigDecimal subtotal;

    @Size(max = 500, message = "Las observaciones no pueden exceder los 500 caracteres")
    private String observaciones;

    private String estado;

    @Size(max = 20, message = "El número de factura no puede exceder los 20 caracteres")
    private String numeroFactura;
    private String serie;

    // Lista de detalles de la venta
    @Valid
    private List<VentaDetalleDTO> detalles = new ArrayList<>();
    private Long clienteId;
    private String clienteNombre;
    private String clienteDni;
    @Valid
    private List<PagosDTO> pagos = new ArrayList<>();
}