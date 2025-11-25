package com.example.copicom.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class PagosDTO {

    private Long id;
    private String modo;
    private BigDecimal monto;
    private Long ventaId;




}