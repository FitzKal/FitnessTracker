package com.undieb.hu.main.Controllers;

import com.undieb.hu.main.Controllers.DTOs.LoginRequestDTO;
import com.undieb.hu.main.Controllers.DTOs.LoginUserResponseDTO;
import com.undieb.hu.main.Controllers.DTOs.RegisterUserDto;
import com.undieb.hu.main.Controllers.DTOs.RegisterUserResponse;
import com.undieb.hu.main.Services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> registerUser(@NonNull @RequestBody RegisterUserDto registerUserDto){
        return ResponseEntity.ok(authenticationService.registerUser(registerUserDto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDTO> loginUser(@NonNull @RequestBody LoginRequestDTO requestDTO){
        return ResponseEntity.ok(authenticationService.loginUser(requestDTO));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request){
        authenticationService.logout(request);
        return ResponseEntity.ok("You have been successfully logged out!");
    }

    @PostMapping("/confirmRegister")
    public ResponseEntity<LoginUserResponseDTO> confirmRegister(@NonNull @RequestParam String verificationCode,
                                                                @RequestBody RegisterUserResponse registerUserResponse){
        var newUser =  authenticationService.confirmRegistration(verificationCode,registerUserResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }


}
