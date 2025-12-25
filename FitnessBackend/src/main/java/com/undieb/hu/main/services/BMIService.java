package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.calculators.CalorieIntakeRequestDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.ProteinCalculatorResponse;
import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import com.undieb.hu.main.models.enums.ExerciseType;
import com.undieb.hu.main.models.enums.Gender;
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

    public ProteinCalculatorResponse calculateProteinIntakeByProfile(HttpServletRequest request,ExerciseType exerciseType){
        var user = jwtService.getUserFromRequest(request);
        var userProfile = user.getUserProfile();
        if (userProfile == null){
            throw  new ProfileNotFoundException("Profile cannot be found");
        }
        var calculatedCalories = calculateCaloriesByProfile(request,exerciseType);
        var response = new ProteinCalculatorResponse();
        response.setDataByADA(calculateProteinADA(userProfile.getWeight(),exerciseType));
        response.setDataByCDC(calculateProteinCDC(calculatedCalories));
        response.setDataByWHO(calculateProteinWHO(userProfile.getWeight()));
        return response;
    }

    public ProteinCalculatorResponse calculateProteinIntakeCustom(CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        calorieIntakeRequestDTO.setHeight(calorieIntakeRequestDTO.getHeight()/100);
        var dailyCalories = calculateDailyCaloriesByExercise(calorieIntakeRequestDTO);
        var response = new ProteinCalculatorResponse();
        response.setDataByADA(calculateProteinADA(calorieIntakeRequestDTO.getWeight(),calorieIntakeRequestDTO.getExerciseType()));
        response.setDataByCDC(calculateProteinCDC(dailyCalories));
        response.setDataByWHO(calculateProteinWHO(calorieIntakeRequestDTO.getWeight()));
        return response;
    }

    public Double calculateCaloriesByProfile(HttpServletRequest request,ExerciseType exerciseType){
        var user = jwtService.getUserFromRequest(request);
        var userProfile = user.getUserProfile();
        if (userProfile == null){
            throw  new ProfileNotFoundException("Profile cannot be found");
        }
        var statsByProfile = new CalorieIntakeRequestDTO(userProfile.getHeight(),userProfile.getWeight(),userProfile.getAge()
                ,userProfile.getGender(),exerciseType);
        return calculateDailyCaloriesByExercise(statsByProfile);
    }

    public Double calculateCaloriesCustom(CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        calorieIntakeRequestDTO.setHeight(calorieIntakeRequestDTO.getHeight()/100);
        var statsByProfile = new CalorieIntakeRequestDTO(calorieIntakeRequestDTO.getHeight(),calorieIntakeRequestDTO.getWeight(),calorieIntakeRequestDTO.getAge()
                ,calorieIntakeRequestDTO.getGender(),calorieIntakeRequestDTO.getExerciseType());
        return calculateDailyCaloriesByExercise(statsByProfile);
    }

    private Double calculateProteinWHO(double weight){
        return weight*0.83;
    }

    private String calculateProteinCDC(Double dailyCalorie){
        return ((dailyCalorie * 10)/100)/4 + " - " +((dailyCalorie * 35)/100)/4;
    }

    private String calculateProteinADA(double weight, ExerciseType exerciseType){
        if (exerciseType == ExerciseType.SEDENTARY){
            var lowerLimit = weight * 0.8;
            return lowerLimit + " - " + weight;
        }else {
            var upperLimit = weight * 1.8;
            return weight + " - " + upperLimit;
        }
    }

    private Double calculateDailyCaloriesByExercise(CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        double baseCalorieIntake = calculateBaseDailyCalorieIntake(calorieIntakeRequestDTO.getHeight(),calorieIntakeRequestDTO.getWeight()
                ,calorieIntakeRequestDTO.getAge(),calorieIntakeRequestDTO.getGender());
        switch (calorieIntakeRequestDTO.getExerciseType()){
            case SEDENTARY -> {
                return baseCalorieIntake * 1.2;
            }
            case LIGHT -> {
                return baseCalorieIntake * 1.375;
            }
            case MODERATE -> {
                return baseCalorieIntake * 1.465;
            }
            case ACTIVE -> {
                return baseCalorieIntake * 1.55;
            }
            case VERY_ACTIVE -> {
                return baseCalorieIntake *  1.725;
            }
            case EXTRA_ACTIVE -> {
                return baseCalorieIntake * 1.9;
            }
            default -> {
                return baseCalorieIntake;
            }
        }
    }

    private Double calculateBaseDailyCalorieIntake(Double height, Double weight, int age, Gender gender){
        if (gender == Gender.MALE){
            height = height * 100;
            return (10*weight) + (6.25*height) - (5*age) + 5;
        }else{
            return (10*weight) + (6.25*height) - (5*age) - 161;
        }
    }

    private Double calculateBMI(Double height, Double weight){
        var squaredHeight = height * height;
        return weight/squaredHeight;
    }
}
