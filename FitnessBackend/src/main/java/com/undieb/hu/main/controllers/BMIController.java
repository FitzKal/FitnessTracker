package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.calculators.BMIRequestDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.CalorieIntakeRequestDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.ProteinCalculatorResponse;
import com.undieb.hu.main.models.enums.ExerciseType;
import com.undieb.hu.main.services.BMIService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/fitness")
public class BMIController {
    private final BMIService bmiService;

    @GetMapping("/bmi")
    public ResponseEntity<Double> getUserBmi(HttpServletRequest request){
        return ResponseEntity.ok(bmiService.calculateBMIByProfile(request));
    }

    @PostMapping("/bmi/custom")
    public ResponseEntity<Double> getCustomBMI(@NonNull @RequestBody BMIRequestDTO bmiRequestDTO){
        return ResponseEntity.ok(bmiService.calculateCustomBmi(bmiRequestDTO.getHeight(),bmiRequestDTO.getWeight()));
    }

    @PostMapping("/protein")
    public ResponseEntity<ProteinCalculatorResponse> calculateProteinByProfile(@NonNull @RequestParam ExerciseType exerciseType, HttpServletRequest request){
        return ResponseEntity.ok(bmiService.calculateProteinIntakeByProfile(request,exerciseType));
    }

    @PostMapping("/protein/custom")
    public ResponseEntity<ProteinCalculatorResponse> calculateProteinCustom(@NonNull @RequestBody CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        return ResponseEntity.ok(bmiService.calculateProteinIntakeCustom(calorieIntakeRequestDTO));
    }

    @PostMapping("/calorie")
    public ResponseEntity<Double> getCaloriesByExercise(@NonNull @RequestParam ExerciseType exerciseType, HttpServletRequest request){
        return ResponseEntity.ok(bmiService.calculateCaloriesByProfile(request,exerciseType));
    }

    @PostMapping("/calorie/custom")
    public ResponseEntity<Double> getCaloriesCustom(@NonNull @RequestBody CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        return ResponseEntity.ok(bmiService.calculateCaloriesCustom(calorieIntakeRequestDTO));
    }
}
