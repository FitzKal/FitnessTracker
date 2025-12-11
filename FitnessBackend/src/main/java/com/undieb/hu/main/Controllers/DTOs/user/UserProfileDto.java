package com.undieb.hu.main.Controllers.DTOs.user;

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
}
