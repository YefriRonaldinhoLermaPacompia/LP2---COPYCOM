package com.example.copicom.mapper;

import com.example.copicom.dto.AcabadoDto;
import com.example.copicom.entity.Acabado;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AcabadoMapper {
    AcabadoDto toDto(Acabado entity);
    Acabado toEntity(AcabadoDto dto);
}
