package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.goals.CreateGoalRequest;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.services.MonthlyGoalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/goal")
public class GoalController {
    private final MonthlyGoalService monthlyGoalService;

    @PostMapping
    public ResponseEntity<MonthlyGoalDTO> createGoal(@RequestBody CreateGoalRequest createGoalRequest, HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.createGoal(createGoalRequest,request));
    }


}
