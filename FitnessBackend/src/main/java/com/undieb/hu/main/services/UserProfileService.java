package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.user.UserImg;
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
        var convertedProfile = userProfileToUserProfileDtoConverter.userProfileToUserProfileDto(user.getUserProfile());
        convertedProfile.setEmail(user.getEmail());
        return convertedProfile;
    }

    public UserProfileDto updateUserProfile(HttpServletRequest request, UserProfileDto userProfileDto, MultipartFile file) throws IOException {
        var user = getUserFromRequest(request);
        var newImgDetails = new UserImg();
        if (user.getUserProfile() == null){
            throw new ProfileNotFoundException("The user's profile cannot be found");
        }
        var profileToUpdate = user.getUserProfile();
        if (file != null){
            s3Service.deleteFile(profileToUpdate.getProfilePictureName());
            newImgDetails = s3Service.uploadFile(file);
            profileToUpdate.setProfilePictureName(newImgDetails.getImgName());
            profileToUpdate.setProfilePictureSrc(newImgDetails.getImgUrl());
        }
        profileToUpdate.setFirstName(userProfileDto.getFirstName());
        profileToUpdate.setLastName(userProfileDto.getLastName());
        profileToUpdate.setWeight(userProfileDto.getWeight());
        profileToUpdate.setHeight(userProfileDto.getHeight());
        userProfileRepository.save(profileToUpdate);
        return userProfileToUserProfileDtoConverter.userProfileToUserProfileDto(profileToUpdate);
    }

    public String deleteUserProfile(HttpServletRequest request){
        var user = getUserFromRequest(request);
        if (user.getUserProfile() == null){
            throw new ProfileNotFoundException("The user's profile cannot be found");
        }
        var profileToDelete = user.getUserProfile();
        s3Service.deleteFile(profileToDelete.getProfilePictureName());
        user.removeProfile();
        userProfileRepository.deleteById(profileToDelete.getProfileId());
        return "The profile was deleted successfully!";
    }

    private Users getUserFromRequest(HttpServletRequest request) {
        var tokenFromRequest = jwtService.extractTokenFromRequest(request);
        var username = jwtService.getUserNameFromToken(tokenFromRequest);
        return userRepository.findByUsername(username);
    }

}
