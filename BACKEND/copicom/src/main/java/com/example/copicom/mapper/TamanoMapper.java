package com.example.copicom.mapper;

import com.example.copicom.dto.TamanoDto;
import com.example.copicom.entity.Tamano;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TamanoMapper {
    TamanoDto toDto(Tamano entity);
    Tamano toEntity(TamanoDto dto);
}
