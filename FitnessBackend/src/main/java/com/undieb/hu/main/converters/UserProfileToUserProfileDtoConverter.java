package com.undieb.hu.main.converters;

import com.undieb.hu.main.controllers.DTOs.user.UserProfileDto;
import com.undieb.hu.main.models.UserProfile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserProfileToUserProfileDtoConverter {
    UserProfileDto userProfileToUserProfileDto(UserProfile userProfile);
    UserProfile userProfileDtoToUserProfile(UserProfileDto profileDto);
}
