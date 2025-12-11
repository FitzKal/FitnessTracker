package com.undieb.hu.main.Controllers.DTOs.auth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewVerificationRequest {
    private String email;
}
