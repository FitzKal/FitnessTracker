package com.undieb.hu.main.controllers.DTOs.goals;

import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@Builder
public class MonthlyGoalDTO {
    private Long monthlyGoalId;
    private LocalDate startDate;
    private LocalDate finishDate;
    private ExerciseTypeCalc exerciseType;
    private Double goalWeight;
    private int exercisesDone;
    private int exercisesRemaining;
    private Double currentWeight;
}
