package com.undieb.hu.main.controllers.goals;

import com.undieb.hu.main.controllers.DTOs.goals.WeeklyGoalDTO;
import com.undieb.hu.main.services.goals.WeeklyGoalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fitness/goal")
@AllArgsConstructor
public class WeeklyGoalController {
    private final WeeklyGoalService weeklyGoalService;

    @GetMapping("/weeklyGoal/{id}")
    public ResponseEntity<WeeklyGoalDTO> getWeeklyGoalById(@PathVariable Long id){
        return ResponseEntity.ok(weeklyGoalService.getWeeklyGoalById(id));
    }

    @GetMapping("/weeklyGoal")
    public ResponseEntity<List<WeeklyGoalDTO>> getAllWeeklyGoals(HttpServletRequest request){
        return ResponseEntity.ok(weeklyGoalService.getAllWeeklyGoals(request));
    }

    @DeleteMapping("/deleteWeeklyGoal/{weeklyGoalId}")
    public ResponseEntity<String>deleteWeeklyGoal(@PathVariable Long weeklyGoalId){
        return ResponseEntity.ok(weeklyGoalService.deleteWeeklyGoal(weeklyGoalId));
    }

}
