package com.undieb.hu.main.controllers.DTOs.auth;

import com.undieb.hu.main.Models.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserResponse {
    private Users user;
    private String lastOTP;
    private Instant otpTime;
}