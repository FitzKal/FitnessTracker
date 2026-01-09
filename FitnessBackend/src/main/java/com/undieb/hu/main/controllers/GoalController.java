package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.goals.CreateGoalRequest;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.controllers.DTOs.goals.WeeklyGoalDTO;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.services.MonthlyGoalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/goal")
public class GoalController {
    private final MonthlyGoalService monthlyGoalService;

    @PostMapping
    public ResponseEntity<MonthlyGoalDTO> createGoal(@RequestBody CreateGoalRequest createGoalRequest, HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.createGoal(createGoalRequest,request));
    }

    @PostMapping("/addExercise")
    public ResponseEntity<String> createGoal(@RequestBody ExercisesDone exercisesDone, HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.addExerciseToGoal(exercisesDone,request));
    }


    //---Getter---//
    @GetMapping("/{id}")
    public ResponseEntity<MonthlyGoalDTO> getGoalById(@PathVariable Long id){
        return ResponseEntity.ok(monthlyGoalService.getMonthlyGoalById(id));
    }

    @GetMapping
    public ResponseEntity<List<MonthlyGoalDTO>> getMonthlyGoalList(HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.getAllMonthlyGoals(request));
    }

    @GetMapping("/weeklyGoal/{id}")
    public ResponseEntity<WeeklyGoalDTO> getWeeklyGoalById(@PathVariable Long id){
        return ResponseEntity.ok(monthlyGoalService.getWeeklyGoalById(id));
    }


    //---Delete---//
    @DeleteMapping("/deleteDailyGoal/{dailyGoalId}")
    public ResponseEntity<String> deleteDailyGoal(@PathVariable Long dailyGoalId){
        return ResponseEntity.ok(monthlyGoalService.deleteDailyGoal(dailyGoalId));
    }

    @DeleteMapping("/deleteMonthlyGoal/{monthlyGoalId}")
    public ResponseEntity<String>deleteMonthlyGoal(@PathVariable Long monthlyGoalId){
        return ResponseEntity.ok(monthlyGoalService.deleteMonthlyGoal(monthlyGoalId));
    }

    @DeleteMapping ("/deleteWeeklyGoal/{weeklyGoalId}")
    public ResponseEntity<String>deleteWeeklyGoal(@PathVariable Long weeklyGoalId){
        return ResponseEntity.ok(monthlyGoalService.deleteWeeklyGoal(weeklyGoalId));
    }

    @DeleteMapping("/deleteFromDailyExercises/{exerciseId}")
    public ResponseEntity<String>deleteFromDailyExercises(@PathVariable String exerciseId, @RequestParam Long dailyGoalId){
        return ResponseEntity.ok(monthlyGoalService.deleteFromDailyExerciseList(exerciseId,dailyGoalId));
    }

}
