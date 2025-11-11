package com.example.copicom.mapper;

import com.example.copicom.dto.ColorDto;
import com.example.copicom.entity.Color;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ColorMapper {
    ColorDto toDto(Color entity);
    Color toEntity(ColorDto dto);
}
