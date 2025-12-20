package com.undieb.hu.main.controllers;

import com.undieb.hu.main.services.BMIService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("api/fitness/bmi")
public class BMIController {
    private final BMIService bmiService;

    @GetMapping
    public ResponseEntity<Double> getUserBmi(HttpServletRequest request){
        return ResponseEntity.ok(bmiService.calculateBMIByProfile(request));
    }

    @GetMapping("/custom")
    public ResponseEntity<Double> getCustomBMI(@NonNull @RequestParam Double height, @NonNull @RequestParam Double weight){
        return ResponseEntity.ok(bmiService.calculateCustomBmi(height,weight));
    }
}
