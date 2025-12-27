package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.calculators.BMIRequestDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.CalorieIntakeRequestDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.CalorieResponseDTO;
import com.undieb.hu.main.controllers.DTOs.calculators.ProteinCalculatorResponse;
import com.undieb.hu.main.models.enums.ExerciseType;
import com.undieb.hu.main.services.CalculatorService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/fitness")
public class CalculatorController {
    private final CalculatorService calculatorService;

    @GetMapping("/bmi")
    public ResponseEntity<Double> getUserBmi(HttpServletRequest request){
        return ResponseEntity.ok(calculatorService.calculateBMIByProfile(request));
    }

    @PostMapping("/bmi/custom")
    public ResponseEntity<Double> getCustomBMI(@NonNull @RequestBody BMIRequestDTO bmiRequestDTO){
        return ResponseEntity.ok(calculatorService.calculateCustomBmi(bmiRequestDTO.getHeight(),bmiRequestDTO.getWeight()));
    }

    @PostMapping("/protein")
    public ResponseEntity<ProteinCalculatorResponse> calculateProteinByProfile(@NonNull @RequestParam ExerciseType exerciseType, HttpServletRequest request){
        return ResponseEntity.ok(calculatorService.calculateProteinIntakeByProfile(request,exerciseType));
    }

    @PostMapping("/protein/custom")
    public ResponseEntity<ProteinCalculatorResponse> calculateProteinCustom(@NonNull @RequestBody CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        return ResponseEntity.ok(calculatorService.calculateProteinIntakeCustom(calorieIntakeRequestDTO));
    }

    @PostMapping("/calorie")
    public ResponseEntity<CalorieResponseDTO> getCaloriesByExercise(@NonNull @RequestParam ExerciseType exerciseType, HttpServletRequest request){
        return ResponseEntity.ok(calculatorService.calculateProfileCalories(request,exerciseType));
    }

    @PostMapping("/calorie/custom")
    public ResponseEntity<CalorieResponseDTO> getCaloriesCustom(@NonNull @RequestBody CalorieIntakeRequestDTO calorieIntakeRequestDTO){
        return ResponseEntity.ok(calculatorService.calculateCaloriesCustom(calorieIntakeRequestDTO));
    }
}
