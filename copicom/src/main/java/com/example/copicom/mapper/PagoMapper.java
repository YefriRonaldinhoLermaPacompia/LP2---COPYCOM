package com.example.copicom.mapper;

import com.example.copicom.dto.PagoDto;
import com.example.copicom.entity.Pago;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PagoMapper {
    
    @Mapping(target = "ventaId", source = "venta.id")
    PagoDto toDto(Pago pago);
    
    @Mapping(target = "venta", ignore = true)
    Pago toEntity(PagoDto dto);
}

