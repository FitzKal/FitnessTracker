package com.undieb.hu.main.services.goals;

import com.undieb.hu.main.converters.GoalConverter;
import com.undieb.hu.main.repositories.DailyGoalRepository;
import com.undieb.hu.main.services.helpers.MonthlyGoalHelper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DailyGoalService {
    private final MonthlyGoalHelper monthlyGoalHelper;
    private final DailyGoalRepository dailyGoalRepository;
    private final GoalConverter goalConverter;

    public String deleteDailyGoal(Long dailyGoalId){
        var dailyGoal = monthlyGoalHelper.fetchDailyGoalById(dailyGoalId);
        var weeklyGoal = monthlyGoalHelper.fetchWeeklyGoalById(dailyGoal.getWeeklyGoal().getId());
        weeklyGoal.removeFromDailyGoals(dailyGoal);
        dailyGoalRepository.deleteById(dailyGoalId);
        weeklyGoal.setExercisesRemaining(weeklyGoal.getExercisesRemaining() + 1);
        weeklyGoal.getMonthlyGoal().markExerciseUnDone();
        monthlyGoalHelper.saveToMonthlyGoalRepository(dailyGoal.getWeeklyGoal().getMonthlyGoal());
        return "Daily goal removed";
    }

    public String deleteFromDailyExerciseList(String exerciseId,Long dailyGoalId){
        var dailyGoal = monthlyGoalHelper.fetchDailyGoalById(dailyGoalId);
        dailyGoal.deleteFromExercises(exerciseId);
        monthlyGoalHelper.saveToMonthlyGoalRepository(dailyGoal.getWeeklyGoal().getMonthlyGoal());
        return "Exercise deleted or decremented";
    }
}
