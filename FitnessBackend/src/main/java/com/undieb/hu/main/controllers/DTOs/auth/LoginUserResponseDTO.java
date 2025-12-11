package com.undieb.hu.main.controllers.DTOs.auth;

import com.undieb.hu.main.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserResponseDTO {
    private String username;
    private String accessToken;
    private Role role;
}
