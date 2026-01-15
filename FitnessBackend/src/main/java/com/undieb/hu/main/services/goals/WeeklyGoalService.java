package com.undieb.hu.main.services.goals;

import com.undieb.hu.main.controllers.DTOs.goals.WeeklyGoalDTO;
import com.undieb.hu.main.converters.GoalConverter;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import com.undieb.hu.main.repositories.WeeklyGoalRepository;
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
public class WeeklyGoalService {

    private final GoalConverter goalConverter;
    private final MonthlyGoalHelper monthlyGoalHelper;
    private final JWTService jwtService;
    private final WeeklyGoalRepository weeklyGoalRepository;

    public WeeklyGoalDTO getWeeklyGoalById(Long id){
        var weeklyGoal = monthlyGoalHelper.fetchWeeklyGoalById(id);
        return goalConverter.weeklyGoalToWeeklyGoalDTO(weeklyGoal);
    }

    public List<WeeklyGoalDTO> getAllWeeklyGoals(HttpServletRequest request){
        var userName = jwtService.getUserFromRequest(request).getUsername();
        return weeklyGoalRepository.findAll().stream()
                .filter(goal ->goal.getMonthlyGoal().getUserProfile().getUser().getUsername().equals(userName))
                .map(goalConverter::weeklyGoalToWeeklyGoalDTO)
                .sorted(Comparator.comparing(WeeklyGoalDTO::getEndOfTheWeek).reversed())
                .collect(Collectors.toList());
    }

    public String deleteWeeklyGoal(Long weeklyGoalId){
        var weeklyGoal = monthlyGoalHelper.fetchWeeklyGoalById(weeklyGoalId);
        var monthlyGoal = monthlyGoalHelper.fetchMonthlyGoalById(weeklyGoal.getMonthlyGoal().getMonthlyGoalId());
        int allExercisesDone = weeklyGoal.getDailyGoals().size();
        if (!(monthlyGoal.getExercisesRemaining() == 0 && monthlyGoal.getExerciseType()== ExerciseTypeCalc.SEDENTARY)){
            monthlyGoal.setExercisesRemaining(
                    monthlyGoal.getExercisesRemaining() + allExercisesDone
            );
        }
        monthlyGoal.setExercisesDone(
                monthlyGoal.getExercisesDone() -  allExercisesDone
        );
        monthlyGoal.removeFromWeeklyGoals(weeklyGoal);
        weeklyGoalRepository.deleteById(weeklyGoalId);
        monthlyGoalHelper.saveToMonthlyGoalRepository(monthlyGoal);
        return "Weekly Goal successfully deleted";
    }

}
