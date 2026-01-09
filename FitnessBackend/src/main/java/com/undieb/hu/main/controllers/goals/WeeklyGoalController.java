package com.undieb.hu.main.controllers.goals;

import com.undieb.hu.main.controllers.DTOs.goals.WeeklyGoalDTO;
import com.undieb.hu.main.services.goals.WeeklyGoalService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fitness/goal")
@AllArgsConstructor
public class WeeklyGoalController {
    private final WeeklyGoalService weeklyGoalService;

    @GetMapping("/weeklyGoal/{id}")
    public ResponseEntity<WeeklyGoalDTO> getWeeklyGoalById(@PathVariable Long id){
        return ResponseEntity.ok(weeklyGoalService.getWeeklyGoalById(id));
    }

    @DeleteMapping("/deleteWeeklyGoal/{weeklyGoalId}")
    public ResponseEntity<String>deleteWeeklyGoal(@PathVariable Long weeklyGoalId){
        return ResponseEntity.ok(weeklyGoalService.deleteWeeklyGoal(weeklyGoalId));
    }

}
