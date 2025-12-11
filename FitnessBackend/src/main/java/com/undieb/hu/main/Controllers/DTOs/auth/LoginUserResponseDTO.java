package com.undieb.hu.main.Controllers.DTOs.auth;

import com.undieb.hu.main.Models.Role;
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
