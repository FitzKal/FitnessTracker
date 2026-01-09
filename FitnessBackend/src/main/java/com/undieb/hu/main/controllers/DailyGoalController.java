package com.undieb.hu.main.controllers;

import com.undieb.hu.main.services.DailyGoalService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/fitness/goal")
public class DailyGoalController {
    private final DailyGoalService dailyGoalService;

    @DeleteMapping("/deleteDailyGoal/{dailyGoalId}")
    public ResponseEntity<String> deleteDailyGoal(@PathVariable Long dailyGoalId){
        return ResponseEntity.ok(dailyGoalService.deleteDailyGoal(dailyGoalId));
    }

    @DeleteMapping("/deleteFromDailyExercises/{exerciseId}")
    public ResponseEntity<String>deleteFromDailyExercises(@PathVariable String exerciseId, @RequestParam Long dailyGoalId){
        return ResponseEntity.ok(dailyGoalService.deleteFromDailyExerciseList(exerciseId,dailyGoalId));
    }
}
