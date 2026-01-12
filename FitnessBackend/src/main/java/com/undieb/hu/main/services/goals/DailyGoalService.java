package com.undieb.hu.main.services.goals;

import com.undieb.hu.main.controllers.DTOs.goals.DailyGoalDTO;
import com.undieb.hu.main.converters.GoalConverter;
import com.undieb.hu.main.models.enums.DailyGoal;
import com.undieb.hu.main.repositories.DailyGoalRepository;
import com.undieb.hu.main.services.JWTService;
import com.undieb.hu.main.services.helpers.MonthlyGoalHelper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DailyGoalService {
    private final MonthlyGoalHelper monthlyGoalHelper;
    private final DailyGoalRepository dailyGoalRepository;
    private final GoalConverter goalConverter;
    private final JWTService jwtService;

    public DailyGoalDTO getDailyGoalById(Long id){
        var dailyGoal = monthlyGoalHelper.fetchDailyGoalById(id);
        return goalConverter.dailyGoalToDailyGoalDTO(dailyGoal);
    }

    public List<DailyGoalDTO> getAllDailyGoals(HttpServletRequest request){
        var username = jwtService.getUserFromRequest(request).getUsername();
        return dailyGoalRepository.findAll().stream()
                .filter(goal->goal.getWeeklyGoal().getMonthlyGoal()
                        .getUserProfile().getUser().getUsername().equals(username))
                .map(goalConverter::dailyGoalToDailyGoalDTO).
                sorted(Comparator.comparing(DailyGoalDTO::getDateOfExercise).reversed())
                .collect(Collectors.toList());
    }

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
