package com.example.copicom.mapper;

import com.example.copicom.dto.ClienteDto;
import com.example.copicom.entity.Cliente;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClienteMapper {
    ClienteDto toDto(Cliente entity);
    Cliente toEntity(ClienteDto dto);
}
