package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.user.UserProfileDto;
import com.undieb.hu.main.converters.UserProfileToUserProfileDtoConverter;
import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import com.undieb.hu.main.models.Users;
import com.undieb.hu.main.repositories.UserProfileRepository;
import com.undieb.hu.main.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final  S3Service s3Service;
    private final UserProfileToUserProfileDtoConverter userProfileToUserProfileDtoConverter;
    private final JWTService jwtService;
    private final UserRepository userRepository;

    public UserProfileDto createUserProfileDto(UserProfileDto userProfileDto, HttpServletRequest request, MultipartFile multipartFile) throws IOException {
        var user = getUserFromRequest(request);
        var imgDetails = s3Service.uploadFile(multipartFile);
        userProfileDto.setProfilePictureSrc(imgDetails.getImgUrl());
        userProfileDto.setProfilePictureName(imgDetails.getImgName());
        var convertedToProfile = userProfileToUserProfileDtoConverter.userProfileDtoToUserProfile(userProfileDto);
        user.setProfile(convertedToProfile);
        userProfileRepository.save(convertedToProfile);
        return userProfileDto;
    }

    public UserProfileDto getUserProfile(HttpServletRequest request){
        var user = getUserFromRequest(request);
        if (user.getUserProfile() == null){
            throw new ProfileNotFoundException("The user's profile cannot be found");
        }
        return userProfileToUserProfileDtoConverter.userProfileToUserProfileDto(user.getUserProfile());
    }

    private Users getUserFromRequest(HttpServletRequest request) {
        var tokenFromRequest = jwtService.extractTokenFromRequest(request);
        var username = jwtService.getUserNameFromToken(tokenFromRequest);
        return userRepository.findByUsername(username);
    }
}
