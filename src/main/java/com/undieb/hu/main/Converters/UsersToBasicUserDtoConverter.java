package com.undieb.hu.main.Converters;

import com.undieb.hu.main.Controllers.DTOs.BasicUserDto;
import com.undieb.hu.main.Models.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsersToBasicUserDtoConverter {
    BasicUserDto userToBasicUserDto(Users user);
    Users basicUserDtoToUser(BasicUserDto dto);
}
