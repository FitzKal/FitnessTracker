package com.undieb.hu.main.converters;

import com.undieb.hu.main.controllers.DTOs.goals.DailyGoalDTO;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.controllers.DTOs.goals.WeeklyGoalDTO;
import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.WeeklyGoal;
import com.undieb.hu.main.models.enums.DailyGoal;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GoalConverter {
    MonthlyGoalDTO monthlyGoalToMonthlyGoalDTO(MonthlyGoal monthlyGoal);
    MonthlyGoal monthlyGoalDTOToMonthlyGoal(MonthlyGoalDTO monthlyGoalDTO);

    WeeklyGoalDTO weeklyGoalToWeeklyGoalDTO(WeeklyGoal weeklyGoal);
    WeeklyGoal weeklyGoalDTOToWeeklyGoal(WeeklyGoalDTO weeklyGoalDTO);

    DailyGoalDTO dailyGoalToDailyGoalDTO(DailyGoal dailyGoal);
    DailyGoal dailyGoalDTOTDailyGoal(DailyGoalDTO dailyGoalDTO);
}
