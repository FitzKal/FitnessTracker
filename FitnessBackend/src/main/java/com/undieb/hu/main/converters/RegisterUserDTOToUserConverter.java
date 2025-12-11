package com.undieb.hu.main.converters;

import com.undieb.hu.main.controllers.DTOs.auth.RegisterUserDto;
import com.undieb.hu.main.models.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegisterUserDTOToUserConverter {
    Users convertRegisterUserDTOToUser(RegisterUserDto registerUserDto);
}
