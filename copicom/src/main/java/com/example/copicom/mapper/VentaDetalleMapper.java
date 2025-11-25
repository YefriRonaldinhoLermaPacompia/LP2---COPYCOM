package com.example.copicom.mapper;


import com.example.copicom.dto.VentaDetalleDTO;
import com.example.copicom.entity.Servicio;
import com.example.copicom.entity.VentaDetalleEntity;
import com.example.copicom.entity.VentaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface VentaDetalleMapper {

    VentaDetalleMapper INSTANCE = Mappers.getMapper(VentaDetalleMapper.class);

    // Convertir de Entidad a DTO
    @Mapping(source = "venta.id", target = "ventaId")
    @Mapping(source = "servicio.id", target = "servicioId")
    @Mapping(source = "servicio.nombreServicio", target = "servicioNombre")
    @Mapping(source = "servicio.precioUnitario", target = "precioUnitario")
    VentaDetalleDTO ventaDetalleToVentaDetalleDTO(VentaDetalleEntity ventaDetalle);

    // Convertir de DTO a Entidad
    @Mapping(source = "ventaId", target = "venta", qualifiedByName = "idToVenta")
    @Mapping(source = "servicioId", target = "servicio", qualifiedByName = "idToServicio")
    @Mapping(target = "id", ignore = true) // Para creación, ignorar ID
    VentaDetalleEntity ventaDetalleDTOToVentaDetalle(VentaDetalleDTO ventaDetalleDTO);

    @Named("idToVenta")
    default VentaEntity idToVenta(Long ventaId) {
        if (ventaId == null) {
            return null;
        }
        VentaEntity venta = new VentaEntity();
        venta.setId(ventaId);
        return venta;
    }

    @Named("idToServicio")
    default Servicio idToProducto(Long productoId) {
        if (productoId == null) {
            return null;
        }
        Servicio servicio = new Servicio();
        servicio.setId(productoId);
        return servicio;
    }
}