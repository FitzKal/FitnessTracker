package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.goals.CreateGoalRequest;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.converters.GoalConverter;
import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import com.undieb.hu.main.exercises.types.ExerciseType;
import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import com.undieb.hu.main.repositories.MonthlyGoalRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@AllArgsConstructor
@Service
public class MonthlyGoalService {
    private final MonthlyGoalRepository monthlyGoalRepository;
    private final JWTService jwtService;
    private final GoalConverter goalConverter;

    public MonthlyGoalDTO createGoal(CreateGoalRequest createGoalRequest, HttpServletRequest request){
        var user = jwtService.getUserFromRequest(request);
        if (user.getUserProfile() == null){
            throw new ProfileNotFoundException("You have to create a profile before setting a goal!");
        }

        if (checkLocalDateValidity(createGoalRequest.getEndDate())){
            throw new DateTimeException("The finish date should last minimum until the start of the next month.");
        }

        var newGoal = MonthlyGoal.builder().startDate(LocalDate.now())
                .finishDate(createGoalRequest.getEndDate())
                .exerciseType(createGoalRequest.getExerciseType())
                .goalWeight(createGoalRequest.getGoalWeight())
                .exercisesDone(0)
                .exercisesRemaining(calculateExercisesToComplete(
                        createGoalRequest.getExerciseType(),
                        LocalDate.now(),
                        createGoalRequest.getEndDate()
                ))
                .currentWeight(user.getUserProfile().getWeight())
                .build();
        user.getUserProfile().addMonthlyGoal(newGoal);
        monthlyGoalRepository.save(newGoal);
        return goalConverter.monthlyGoalToMonthlyGoalDTO(newGoal);

    }

    private Boolean checkLocalDateValidity(LocalDate endDate){
        return endDate.isBefore(LocalDate.now()) &&
                endDate.lengthOfMonth() - LocalDate.now().getDayOfMonth() < 7;
    }

    private int calculateExercisesToComplete(ExerciseTypeCalc exerciseTypeCalc, LocalDate startDate, LocalDate endDate){
        long daysBetween = ChronoUnit.DAYS.between(startDate,endDate);
        int weeks = (int) daysBetween /7;
        switch (exerciseTypeCalc){
            case LIGHT -> {
                return weeks * 2;

            }
            case MODERATE, ACTIVE -> {
                return weeks * 4;
            }
            case VERY_ACTIVE,EXTRA_ACTIVE ->{
                return weeks * 6;
            }
            case null, default -> {
                return 0;
            }
        }
    }
}
