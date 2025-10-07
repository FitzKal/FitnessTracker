package com.undieb.hu.main.Controllers.DTOs;

import lombok.Data;

@Data
public class BasicUserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
}
