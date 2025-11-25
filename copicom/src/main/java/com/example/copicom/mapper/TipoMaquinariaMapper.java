package com.example.copicom.mapper;

import com.example.copicom.dto.TipoMaquinariaDto;
import com.example.copicom.entity.TipoMaquinaria;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TipoMaquinariaMapper {
    TipoMaquinariaDto toDto(TipoMaquinaria entity);
    TipoMaquinaria toEntity(TipoMaquinariaDto dto);
}

