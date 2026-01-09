package com.undieb.hu.main.controllers.goals;

import com.undieb.hu.main.controllers.DTOs.goals.DailyGoalDTO;
import com.undieb.hu.main.services.goals.DailyGoalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/fitness/goal")
public class DailyGoalController {
    private final DailyGoalService dailyGoalService;

    @GetMapping("/dailyGoal/{id}")
    public ResponseEntity<DailyGoalDTO> getDailyGoalById(@PathVariable Long id){
        return ResponseEntity.ok(dailyGoalService.getDailyGoalById(id));
    }

    @GetMapping("/dailyGoal")
    public ResponseEntity<List<DailyGoalDTO>> getAllDailyGoals(HttpServletRequest request){
        return ResponseEntity.ok(dailyGoalService.getAllDailyGoals(request));
    }


    @DeleteMapping("/deleteDailyGoal/{dailyGoalId}")
    public ResponseEntity<String> deleteDailyGoal(@PathVariable Long dailyGoalId){
        return ResponseEntity.ok(dailyGoalService.deleteDailyGoal(dailyGoalId));
    }

    @DeleteMapping("/deleteFromDailyExercises/{exerciseId}")
    public ResponseEntity<String>deleteFromDailyExercises(@PathVariable String exerciseId, @RequestParam Long dailyGoalId){
        return ResponseEntity.ok(dailyGoalService.deleteFromDailyExerciseList(exerciseId,dailyGoalId));
    }
}
