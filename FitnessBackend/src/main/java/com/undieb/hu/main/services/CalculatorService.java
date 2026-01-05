package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.calculators.CalorieIntakeRequestDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.CalorieResponseDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.ProteinCalculatorResponse;
import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import com.undieb.hu.main.models.enums.Gender;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class CalculatorService {

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

    public ProteinCalculatorResponse calculateProteinIntakeByProfile(HttpServletRequest request, ExerciseTypeCalc exerciseTypeCalc){
        var user = jwtService.getUserFromRequest(request);
        var userProfile = user.getUserProfile();
        if (userProfile == null){
            throw  new ProfileNotFoundException("Profile cannot be found");
        }
        var calculatedCalories = calculateCaloriesByProfile(request, exerciseTypeCalc);
        var response = new ProteinCalculatorResponse();
        response.setDataByADA(calculateProteinADA(userProfile.getWeight(), exerciseTypeCalc));
        response.setDataByCDC(calculateProteinCDC(calculatedCalories));
        response.setDataByWHO(calculateProteinWHO(userProfile.getWeight()));
        return response;
    }

    public ProteinCalculatorResponse calculateProteinIntakeCustom(CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        calorieIntakeRequestDTO.setHeight(calorieIntakeRequestDTO.getHeight()/100);
        var dailyCalories = calculateDailyCaloriesByExercise(calorieIntakeRequestDTO);
        var response = new ProteinCalculatorResponse();
        response.setDataByADA(calculateProteinADA(calorieIntakeRequestDTO.getWeight(),calorieIntakeRequestDTO.getExerciseTypeCalc()));
        response.setDataByCDC(calculateProteinCDC(dailyCalories));
        response.setDataByWHO(calculateProteinWHO(calorieIntakeRequestDTO.getWeight()));
        return response;
    }

    public CalorieResponseDTO calculateProfileCalories(HttpServletRequest request, ExerciseTypeCalc exerciseTypeCalc){
        var caloriesByProfile = calculateCaloriesByProfile(request, exerciseTypeCalc);
        return calculateCalorieIntake(caloriesByProfile);
    }

    public CalorieResponseDTO calculateCaloriesCustom(CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        calorieIntakeRequestDTO.setHeight(calorieIntakeRequestDTO.getHeight()/100);
        var statsByProfile = new CalorieIntakeRequestDTO(calorieIntakeRequestDTO.getHeight(),calorieIntakeRequestDTO.getWeight(),calorieIntakeRequestDTO.getAge()
                ,calorieIntakeRequestDTO.getGender(),calorieIntakeRequestDTO.getExerciseTypeCalc());
        var calculatedCalories = calculateDailyCaloriesByExercise(statsByProfile);
        return calculateCalorieIntake(calculatedCalories);
    }

    private Double calculateProteinWHO(double weight){
        return Math.floor(weight*0.83);
    }

    private String calculateProteinCDC(Double dailyCalorie){
        return (Math.floor((dailyCalorie * 10)/100)/4) + " - " +Math.floor(((dailyCalorie * 35)/100)/4);
    }

    private String calculateProteinADA(double weight, ExerciseTypeCalc exerciseTypeCalc){
        if (exerciseTypeCalc == ExerciseTypeCalc.SEDENTARY){
            var lowerLimit = weight * 0.8;
            return Math.floor(lowerLimit) + " - " + Math.floor(weight);
        }else {
            var upperLimit = weight * 1.8;
            return Math.floor(weight) + " - " + Math.floor(upperLimit);
        }
    }

    private CalorieResponseDTO calculateCalorieIntake(double calories){
        return CalorieResponseDTO.builder()
                .maintainCalories((int) calories)
                .mildWeightLossCalories((int) Math.floor(calories * 0.9))
                .weightLossCalories((int) Math.floor(calories * 0.8))
                .extremeWeightLossCalories((int) Math.floor(calories * 0.59))
                .mildWeightGainCalories((int) Math.floor(calories * 1.1))
                .weightGainCalories((int) Math.floor(calories * 1.15))
                .extremeWeightGainCalories((int) Math.floor(calories * 1.2))
                .build();
    }

    private Double calculateCaloriesByProfile(HttpServletRequest request, ExerciseTypeCalc exerciseTypeCalc){
        var user = jwtService.getUserFromRequest(request);
        var userProfile = user.getUserProfile();
        if (userProfile == null){
            throw  new ProfileNotFoundException("Profile cannot be found");
        }
        var statsByProfile = new CalorieIntakeRequestDTO(userProfile.getHeight(),userProfile.getWeight(),userProfile.getAge()
                ,userProfile.getGender(), exerciseTypeCalc);
        return calculateDailyCaloriesByExercise(statsByProfile);
    }

    private Double calculateDailyCaloriesByExercise(CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        double baseCalorieIntake = calculateBaseDailyCalorieIntake(calorieIntakeRequestDTO.getHeight(),calorieIntakeRequestDTO.getWeight()
                ,calorieIntakeRequestDTO.getAge(),calorieIntakeRequestDTO.getGender());
        switch (calorieIntakeRequestDTO.getExerciseTypeCalc()){
            case SEDENTARY -> {
                return Math.floor(baseCalorieIntake * 1.2);
            }
            case LIGHT -> {
                return Math.floor(baseCalorieIntake * 1.375);
            }
            case MODERATE -> {
                return Math.floor(baseCalorieIntake * 1.465);
            }
            case ACTIVE -> {
                return Math.floor(baseCalorieIntake * 1.55);
            }
            case VERY_ACTIVE -> {
                return Math.floor(baseCalorieIntake *  1.725);
            }
            case EXTRA_ACTIVE -> {
                return Math.floor(baseCalorieIntake * 1.9);
            }
            default -> {
                return Math.floor(baseCalorieIntake);
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
