package com.example.copicom.mapper;

import com.example.copicom.dto.PedidoDTO;
import com.example.copicom.entity.Pedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {DetallePedidoMapper.class, ClienteMapper.class})
public interface PedidoMapper {
    
    @Mapping(target = "clienteId", source = "cliente.id")
    @Mapping(target = "clienteNombre", expression = "java(pedido.getCliente() != null ? pedido.getCliente().getNombres() + \" \" + pedido.getCliente().getApellidos() : null)")
    @Mapping(target = "clienteDni", source = "cliente.dni")
    @Mapping(target = "envioId", source = "envio.id")
    @Mapping(target = "pagoId", source = "pago.id")
    PedidoDTO toDto(Pedido pedido);
    
    @Mapping(target = "cliente", ignore = true)
    @Mapping(target = "envio", ignore = true)
    @Mapping(target = "pago", ignore = true)
    @Mapping(target = "detalles", ignore = true)
    Pedido toEntity(PedidoDTO dto);
}

