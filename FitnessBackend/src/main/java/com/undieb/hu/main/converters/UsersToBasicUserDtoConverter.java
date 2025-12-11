package com.undieb.hu.main.converters;

import com.undieb.hu.main.controllers.DTOs.user.BasicUserDto;
import com.undieb.hu.main.models.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsersToBasicUserDtoConverter {
    BasicUserDto userToBasicUserDto(Users user);
    Users basicUserDtoToUser(BasicUserDto dto);
}
