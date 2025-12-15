package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.user.UserProfileDto;
import com.undieb.hu.main.services.UserProfileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/profile")
public class UserProfileController {
    private final UserProfileService userProfileService;

    @PostMapping
    public ResponseEntity<UserProfileDto> createProfile(@RequestPart(value = "file",required = false) MultipartFile file,
                                                        @RequestPart("data") @NonNull UserProfileDto userProfileDto,
                                                        HttpServletRequest request) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userProfileService.createUserProfileDto(userProfileDto, request, file));
    }

    @GetMapping
    public ResponseEntity<UserProfileDto> getUserProfile(HttpServletRequest request){
        return ResponseEntity.ok(userProfileService.getUserProfile(request));
    }

    @PutMapping
    public ResponseEntity<UserProfileDto> updateProfile(@RequestPart(value = "file",required = false) MultipartFile file,
                                                        @RequestPart("data") @NonNull UserProfileDto userProfileDto,
                                                        HttpServletRequest request) throws IOException {
        return ResponseEntity.ok(userProfileService.updateUserProfile(request,userProfileDto,file));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteProfile(HttpServletRequest request){
        return ResponseEntity.ok(userProfileService.deleteUserProfile(request));
    }
}
