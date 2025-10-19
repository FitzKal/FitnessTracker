package com.undieb.hu.main.Converters;

import com.undieb.hu.main.Controllers.DTOs.RegisterUserDto;
import com.undieb.hu.main.Models.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegisterUserDTOToUserConverter {
    Users convertRegisterUserDTOToUser(RegisterUserDto registerUserDto);
}
