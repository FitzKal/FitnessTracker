package com.undieb.hu.main.services;

import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class BMIService {

    private final JWTService jwtService;

    public Double calculateBMIByProfile(HttpServletRequest request){
        var user = jwtService.getUserFromRequest(request);
        var userProfile = user.getUserProfile();
        if (userProfile == null){
            throw  new ProfileNotFoundException("Profile cannot be found");
        }
        return calculateBMI(userProfile.getHeight(),userProfile.getWeight());
    }

    public Double calculateCustomBmi(Double height, Double weight){
        var customHeightInCm = height/100;
        return calculateBMI(customHeightInCm,weight);
    }



    private Double calculateBMI(Double height, Double weight){
        var squaredHeight = height * height;
        return weight/squaredHeight;
    }

}
