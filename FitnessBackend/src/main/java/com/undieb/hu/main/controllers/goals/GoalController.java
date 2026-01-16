package com.undieb.hu.main.controllers.goals;

import com.undieb.hu.main.controllers.DTOs.goals.CreateGoalRequest;
import com.undieb.hu.main.controllers.DTOs.goals.GoalUpdateRequest;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.services.goals.MonthlyGoalService;
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
    public ResponseEntity<String> addExercise(@RequestBody ExercisesDone exercisesDone, HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.addExerciseToGoal(exercisesDone,request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonthlyGoalDTO> getGoalById(@PathVariable Long id){
        return ResponseEntity.ok(monthlyGoalService.getMonthlyGoalById(id));
    }

    @GetMapping
    public ResponseEntity<List<MonthlyGoalDTO>> getMonthlyGoalList(HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.getAllMonthlyGoals(request));
    }

    @GetMapping("/getLatestGoal")
    public ResponseEntity<MonthlyGoalDTO> getLatestMonthlyGoal(HttpServletRequest request){
        return ResponseEntity.ok(monthlyGoalService.getLatestGoal(request));
    }

    @DeleteMapping("/deleteMonthlyGoal/{monthlyGoalId}")
    public ResponseEntity<String>deleteMonthlyGoal(@PathVariable Long monthlyGoalId){
        return ResponseEntity.ok(monthlyGoalService.deleteMonthlyGoal(monthlyGoalId));
    }

    @PutMapping("/updateMonthlyGoal")
    public ResponseEntity<MonthlyGoalDTO> updateMonthlyGoal(@RequestBody GoalUpdateRequest goalUpdateRequest){
        return ResponseEntity.ok(monthlyGoalService.updateMonthlyGoal(goalUpdateRequest));
    }
}
