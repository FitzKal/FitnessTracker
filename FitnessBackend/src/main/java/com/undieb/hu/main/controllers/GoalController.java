package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.goals.CreateGoalRequest;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.services.MonthlyGoalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/goal")
public class GoalController {
    private final MonthlyGoalService monthlyGoalService;

    @PostMapping
    public ResponseEntity<MonthlyGoalDTO> createGoal(@RequestBody CreateGoalRequest createGoalRequest, HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.createGoal(createGoalRequest,request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonthlyGoalDTO> getGoalById(@PathVariable Long id){
        return ResponseEntity.ok(monthlyGoalService.getMonthlyGoalById(id));
    }

    @PostMapping("/addExercise")
    public ResponseEntity<String> createGoal(@RequestBody ExercisesDone exercisesDone, HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.addExerciseToGoal(exercisesDone,request));
    }

    @DeleteMapping("/deleteDailyGoal/{weeklyGoalId}")
    public ResponseEntity<String> deleteDailyGoal(@PathVariable Long weeklyGoalId, @RequestParam Long dailyGoalId){
        return ResponseEntity.ok(monthlyGoalService.deleteDailyGoal(weeklyGoalId,dailyGoalId));
    }

}
