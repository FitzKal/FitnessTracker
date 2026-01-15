package com.undieb.hu.main.controllers.DTOs.goals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeeklyGoalDTO {
    private Long id;
    private int exercisesRemaining;
    private LocalDate startOfTheWeek;
    private LocalDate endOfTheWeek;
    private List<DailyGoalDTO> dailyGoals;
    private Long parentMonthId;
}
