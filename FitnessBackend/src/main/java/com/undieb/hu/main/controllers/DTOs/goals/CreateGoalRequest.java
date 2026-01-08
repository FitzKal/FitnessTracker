package com.undieb.hu.main.controllers.DTOs.goals;

import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
@Builder
public class CreateGoalRequest {
    private ExerciseTypeCalc exerciseType;
    private Double goalWeight;
    private LocalDate endDate;
}
