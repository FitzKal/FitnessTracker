package com.undieb.hu.main.controllers.DTOs.goals;

import com.undieb.hu.main.models.ExercisesDone;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DailyGoalDTO {
    private Long id;
    private LocalDate dateOfExercise;
    private List<ExercisesDone> exercisesDone;
    private Long parentWeekId;
    private Long parentMonthId;
}
