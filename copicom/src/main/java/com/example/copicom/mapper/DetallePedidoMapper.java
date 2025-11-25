package com.example.copicom.mapper;

import com.example.copicom.dto.DetallePedidoDTO;
import com.example.copicom.entity.DetallePedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DetallePedidoMapper {
    
    @Mapping(target = "servicioId", source = "servicioId")
    @Mapping(target = "servicioNombre", ignore = true)
    @Mapping(target = "trabajadorNombre", ignore = true)
    @Mapping(target = "maquinaNombre", ignore = true)
    DetallePedidoDTO toDto(DetallePedido detalle);
    
    @Mapping(target = "pedido", ignore = true)
    DetallePedido toEntity(DetallePedidoDTO dto);
}

