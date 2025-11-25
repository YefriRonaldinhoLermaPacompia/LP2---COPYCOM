package com.example.copicom.mapper;

import com.example.copicom.dto.EnvioDto;
import com.example.copicom.entity.Envio;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EnvioMapper {
    EnvioDto toDto(Envio entity);
    Envio toEntity(EnvioDto dto);
}

