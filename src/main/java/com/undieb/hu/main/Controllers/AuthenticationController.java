package com.undieb.hu.main.Controllers;

import com.undieb.hu.main.Services.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    
}
