package com.undieb.hu.main.controllers.DTOs.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {
    private String username;
    private String email;
    private String password;
}
