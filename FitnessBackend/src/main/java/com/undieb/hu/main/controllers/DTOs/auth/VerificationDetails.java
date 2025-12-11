package com.undieb.hu.main.controllers.DTOs.auth;

import lombok.*;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerificationDetails {
    private String lastOTP;
    private Instant otpTime;
}
