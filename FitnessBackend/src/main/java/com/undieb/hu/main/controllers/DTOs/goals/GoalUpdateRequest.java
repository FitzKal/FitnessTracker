package com.undieb.hu.main.controllers.DTOs.goals;

import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GoalUpdateRequest {
    private Long monthlyGoalId;
    private LocalDate newEndDate;
    private ExerciseTypeCalc exerciseTypeCalc;
    private Double newCurrentWeight;
    private Double newGoalWeight;
}
