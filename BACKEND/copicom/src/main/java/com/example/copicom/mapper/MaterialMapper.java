package com.example.copicom.mapper;

import com.example.copicom.dto.MaterialDto;
import com.example.copicom.entity.Material;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
    MaterialDto toDto(Material entity);
    Material toEntity(MaterialDto dto);
}
