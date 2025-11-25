package com.example.copicom.mapper;

import com.example.copicom.dto.TipoGeneracionDto;
import com.example.copicom.entity.TipoGeneracion;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TipoGeneracionMapper {
    TipoGeneracionDto toDto(TipoGeneracion entity);
    TipoGeneracion toEntity(TipoGeneracionDto dto);
}
