package com.undieb.hu.main.Controllers.DTOs;

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
