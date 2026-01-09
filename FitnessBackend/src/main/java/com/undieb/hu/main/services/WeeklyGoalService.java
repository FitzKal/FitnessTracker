package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.goals.WeeklyGoalDTO;
import com.undieb.hu.main.converters.GoalConverter;
import com.undieb.hu.main.repositories.WeeklyGoalRepository;
import com.undieb.hu.main.services.helpers.MonthlyGoalHelper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WeeklyGoalService {

    private final GoalConverter goalConverter;
    private final MonthlyGoalHelper monthlyGoalHelper;
    private final JWTService jwtService;
    private final WeeklyGoalRepository weeklyGoalRepository;

    public WeeklyGoalDTO getWeeklyGoalById(Long id){
        var weeklyGoal = monthlyGoalHelper.fetchWeeklyGoalById(id);
        return goalConverter.weeklyGoalToWeeklyGoalDTO(weeklyGoal);
    }

    public String deleteWeeklyGoal(Long weeklyGoalId){
        var weeklyGoal = monthlyGoalHelper.fetchWeeklyGoalById(weeklyGoalId);
        var monthlyGoal = monthlyGoalHelper.fetchMonthlyGoalById(weeklyGoal.getMonthlyGoal().getMonthlyGoalId());
        monthlyGoal.removeFromWeeklyGoals(weeklyGoal);
        weeklyGoalRepository.deleteById(weeklyGoalId);
        return "Weekly Goal successfully deleted";
    }

}
