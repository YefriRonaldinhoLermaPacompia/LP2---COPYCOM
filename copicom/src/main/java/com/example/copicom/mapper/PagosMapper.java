package com.example.copicom.mapper;


import com.example.copicom.dto.PagosDTO;
import com.example.copicom.entity.Pago;
import com.example.copicom.entity.VentaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PagosMapper {

    PagosMapper INSTANCE = Mappers.getMapper(PagosMapper.class);

    // Convertir de Entidad a DTO
    @Mapping(source = "venta.id", target = "ventaId")
    PagosDTO pagosToPagosDTO(Pago pagosEntity);

    // Convertir de DTO a Entidad
    @Mapping(source = "ventaId", target = "venta", qualifiedByName = "idToVenta")
    @Mapping(target = "id", ignore = true) // Para creación, ignorar ID
    Pago ventaPagosDTOToPagos(PagosDTO pagosDTO);

    @Named("idToVenta")
    default VentaEntity idToVenta(Long ventaId) {
        if (ventaId == null) {
            return null;
        }
        VentaEntity venta = new VentaEntity();
        venta.setId(ventaId);
        return venta;
    }


}