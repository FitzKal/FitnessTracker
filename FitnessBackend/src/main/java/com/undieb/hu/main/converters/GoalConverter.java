package com.undieb.hu.main.converters;

import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.models.MonthlyGoal;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GoalConverter {
    MonthlyGoalDTO monthlyGoalToMonthlyGoalDTO(MonthlyGoal monthlyGoal);
    MonthlyGoal monthlyGoalDTOToMonthlyGoal(MonthlyGoalDTO monthlyGoalDTO);
}
