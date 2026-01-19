package com.undieb.hu.main.controllers.DTOs.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordChangeResponse {
    String email;
    String newPassword;
    private String lastOTP;
    private Instant otpTime;
}
