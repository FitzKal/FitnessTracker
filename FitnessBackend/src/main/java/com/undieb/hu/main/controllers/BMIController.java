package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.calculators.BMIRequestDTO;
import com.undieb.hu.main.services.BMIService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/fitness/bmi")
public class BMIController {
    private final BMIService bmiService;

    @GetMapping
    public ResponseEntity<Double> getUserBmi(HttpServletRequest request){
        return ResponseEntity.ok(bmiService.calculateBMIByProfile(request));
    }

    @PostMapping("/custom")
    public ResponseEntity<Double> getCustomBMI(@NonNull @RequestBody BMIRequestDTO bmiRequestDTO){
        return ResponseEntity.ok(bmiService.calculateCustomBmi(bmiRequestDTO.getHeight(),bmiRequestDTO.getWeight()));
    }
}
