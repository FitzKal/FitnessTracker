package com.undieb.hu.main.Converters;

import com.undieb.hu.main.controllers.DTOs.auth.RegisterUserDto;
import com.undieb.hu.main.Models.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegisterUserDTOToUserConverter {
    Users convertRegisterUserDTOToUser(RegisterUserDto registerUserDto);
}
