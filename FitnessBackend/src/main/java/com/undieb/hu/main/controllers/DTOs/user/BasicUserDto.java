package com.undieb.hu.main.controllers.DTOs.user;

import com.undieb.hu.main.models.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BasicUserDto {
    private Long id;
    private String username;
    private String password;
    private Role role;
    private String email;
}
