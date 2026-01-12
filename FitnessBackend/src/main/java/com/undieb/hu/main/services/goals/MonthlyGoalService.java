package com.undieb.hu.main.services.goals;

import com.undieb.hu.main.controllers.DTOs.goals.CreateGoalRequest;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.converters.GoalConverter;
import com.undieb.hu.main.exceptions.GoalNotFoundException;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.WeeklyGoal;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import com.undieb.hu.main.repositories.MonthlyGoalRepository;
import com.undieb.hu.main.services.JWTService;
import com.undieb.hu.main.services.helpers.MonthlyGoalHelper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@AllArgsConstructor
@Service
public class MonthlyGoalService {
    private final MonthlyGoalRepository monthlyGoalRepository;
    private final JWTService jwtService;
    private final GoalConverter goalConverter;
    private final MonthlyGoalHelper monthlyGoalHelper;


    public MonthlyGoalDTO createGoal(CreateGoalRequest createGoalRequest, HttpServletRequest request){
        var userProfile = monthlyGoalHelper.checkIfUserProfileExists(request);

        if (monthlyGoalHelper.checkLocalDateValidity(createGoalRequest.getEndDate())){
            throw new DateTimeException("The finish date should last minimum until the start of the next month.");
        }

        var newGoal = MonthlyGoal.builder().startDate(LocalDate.now())
                .finishDate(createGoalRequest.getEndDate())
                .exerciseType(createGoalRequest.getExerciseType())
                .goalWeight(createGoalRequest.getGoalWeight())
                .exercisesDone(0)
                .exercisesRemaining(monthlyGoalHelper.calculateExercisesToComplete(
                        createGoalRequest.getExerciseType(),
                        LocalDate.now(),
                        createGoalRequest.getEndDate()
                ))
                .currentWeight(userProfile.getWeight())
                .build();
        userProfile.addMonthlyGoal(newGoal);
        monthlyGoalRepository.save(newGoal);
        return goalConverter.monthlyGoalToMonthlyGoalDTO(newGoal);

    }

    @Transactional
    public String addExerciseToGoal(ExercisesDone exercisesDone,HttpServletRequest request){

        var userProfile = monthlyGoalHelper.checkIfUserProfileExists(request);

        var latestGoal = userProfile.getMonthlyGoals()
                .stream().max(Comparator.comparing(MonthlyGoal::getStartDate))
                .orElseThrow(() ->new GoalNotFoundException("You have no goals created"));

        if (LocalDate.now().isAfter(latestGoal.getFinishDate())){
            throw new RuntimeException("You cannot add exercise to an already expired goal");
        }

        var weeklyGoal = latestGoal.getWeeklyGoals();
        boolean needsNewWeeklyGoal =
                weeklyGoal == null
                        || weeklyGoal.isEmpty()
                        || weeklyGoal.stream()
                        .map(WeeklyGoal::getEndOfTheWeek)
                        .max(LocalDate::compareTo)
                        .map(end -> end.isBefore(LocalDate.now()))
                        .orElse(true);

        if (needsNewWeeklyGoal){
            monthlyGoalHelper.addNewWeaklyGoalAndExercise(latestGoal,exercisesDone);
            return "New Weekly goal created!";
        }

        var currentWeeklyGoal = weeklyGoal.stream().max(Comparator.comparing(WeeklyGoal::getStartOfTheWeek))
                .get();
        boolean exercisedToday = currentWeeklyGoal.getDailyGoals()
                .stream()
                .anyMatch(dg -> dg.getDateOfExercise().equals(LocalDate.now()));
        if (exercisedToday){
            monthlyGoalHelper.addExerciseToDailyGoal(currentWeeklyGoal,exercisesDone);
            monthlyGoalRepository.save(latestGoal);
            return "New exercise saved to daily goals!";
        }
        monthlyGoalHelper.createDailyGoal(exercisesDone,currentWeeklyGoal);
        monthlyGoalRepository.save(latestGoal);
        return "New daily goal created!";
    }

    public MonthlyGoalDTO getMonthlyGoalById(Long id){
        var monthlyGoal = monthlyGoalHelper.fetchMonthlyGoalById(id);
        return goalConverter.monthlyGoalToMonthlyGoalDTO(monthlyGoal);
    }

    public List<MonthlyGoalDTO> getAllMonthlyGoals(HttpServletRequest request){
        var user = jwtService.getUserFromRequest(request);
        return monthlyGoalRepository.findAll()
                .stream()
                .filter(goal -> goal.getUserProfile().getUser().getUsername().equals(user.getUsername()))
                .map(goalConverter::monthlyGoalToMonthlyGoalDTO)
                .sorted(Comparator.comparing(MonthlyGoalDTO::getFinishDate).reversed())
                .toList();
    }

    public String deleteMonthlyGoal(Long monthlyGoalId){
        if (monthlyGoalRepository.existsById(monthlyGoalId)) {
            monthlyGoalRepository.deleteById(monthlyGoalId);
            return "Monthly goal removed";
        }
        throw new GoalNotFoundException("The monthly goal was not found");
    }

    public MonthlyGoalDTO updateMonthlyGoal(LocalDate newEndDate,ExerciseTypeCalc exerciseTypeCalc, Long monthlyGoalId){
        var monthlyGoal = monthlyGoalHelper.fetchMonthlyGoalById(monthlyGoalId);
        LocalDate endDate = monthlyGoal.getFinishDate();
        if (newEndDate != null && !newEndDate.equals(monthlyGoal.getFinishDate())) {
            if (!newEndDate.isAfter(LocalDate.now().plusDays(6))) {
                throw new DateTimeException(
                        "The given end date is incorrect. It must be at least a week after today."
                );
            }
            monthlyGoal.setFinishDate(newEndDate);
            endDate = monthlyGoal.getFinishDate();
        }
        if (exerciseTypeCalc != null && exerciseTypeCalc != monthlyGoal.getExerciseType()){
            monthlyGoal.setExerciseType(exerciseTypeCalc);
            int newRemainingExercises = monthlyGoalHelper.countNewNumberOfExercises(exerciseTypeCalc,monthlyGoal,endDate);
            monthlyGoal.setExercisesRemaining(newRemainingExercises);
        }
        monthlyGoalRepository.save(monthlyGoal);
        return goalConverter.monthlyGoalToMonthlyGoalDTO(monthlyGoal);
    }

}
