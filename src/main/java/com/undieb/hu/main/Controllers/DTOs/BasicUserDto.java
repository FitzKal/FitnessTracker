package com.undieb.hu.main.Controllers.DTOs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BasicUserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
}
