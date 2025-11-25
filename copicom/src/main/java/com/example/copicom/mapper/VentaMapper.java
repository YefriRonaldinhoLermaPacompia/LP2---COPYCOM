package com.example.copicom.mapper;


import com.example.copicom.dto.VentaDTO;
import com.example.copicom.entity.Cliente;
import com.example.copicom.entity.VentaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {VentaDetalleMapper.class})
public interface VentaMapper {

    VentaMapper INSTANCE = Mappers.getMapper(VentaMapper.class);

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.nombres", target = "clienteNombre")
    @Mapping(source = "cliente.dni", target = "clienteDni")
    // Convertir de Entidad a DTO
    @Mapping(source = "detalles", target = "detalles")
    @Mapping(source = "pagos", target = "pagos")
    VentaDTO ventaToVentaDTO(VentaEntity venta);

    // Convertir de DTO a Entidad
    @Mapping(source = "detalles", target = "detalles")
    @Mapping(source = "pagos", target = "pagos")
    @Mapping(target = "id", ignore = true)
    // Para creación, ignorar ID

    @Mapping(source = "clienteId", target = "cliente", qualifiedByName = "idToCliente")
    VentaEntity ventaDTOToVenta(VentaDTO ventaDTO);

    @Named("idToCliente")
    default Cliente idToCliente(Long clienteId) {
        if (clienteId == null) {
            return null;
        }
        // Solo crear referencia con el ID para JPA
        Cliente cliente = new Cliente();
        cliente.setId(clienteId);
        return cliente;
    }
}