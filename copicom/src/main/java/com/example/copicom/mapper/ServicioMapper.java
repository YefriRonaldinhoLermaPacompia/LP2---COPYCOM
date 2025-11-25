package com.example.copicom.mapper;

import com.example.copicom.dto.ServicioDto;
import com.example.copicom.entity.Servicio;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServicioMapper {
    ServicioDto toDto(Servicio entity);
    Servicio toEntity(ServicioDto dto);
}
