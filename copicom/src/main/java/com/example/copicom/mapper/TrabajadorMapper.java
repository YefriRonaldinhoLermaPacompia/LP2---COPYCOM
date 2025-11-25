package com.example.copicom.mapper;

import com.example.copicom.dto.TrabajadorDto;
import com.example.copicom.entity.Trabajador;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrabajadorMapper {
    TrabajadorDto toDto(Trabajador entity);
    Trabajador toEntity(TrabajadorDto dto);
}

