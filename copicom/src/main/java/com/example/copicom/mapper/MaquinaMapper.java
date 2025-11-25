package com.example.copicom.mapper;

import com.example.copicom.dto.MaquinaDto;
import com.example.copicom.entity.Maquina;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MaquinaMapper {
    MaquinaDto toDto(Maquina entity);
    Maquina toEntity(MaquinaDto dto);
}

