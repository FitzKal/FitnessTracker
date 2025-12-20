package com.undieb.hu.main.controllers.DTOs.user;

import com.undieb.hu.main.models.Gender;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileDto {
    private Long profileId;
    private String profilePictureName;
    private String profilePictureSrc;
    private String firstName;
    private String lastName;
    private Double weight;
    private Double height;
    private String email;
    private Gender gender;
}
