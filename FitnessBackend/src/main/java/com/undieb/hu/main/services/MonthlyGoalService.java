package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.goals.CreateGoalRequest;
import com.undieb.hu.main.controllers.DTOs.goals.MonthlyGoalDTO;
import com.undieb.hu.main.converters.GoalConverter;
import com.undieb.hu.main.exceptions.GoalNotFoundException;
import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.UserProfile;
import com.undieb.hu.main.models.WeeklyGoal;
import com.undieb.hu.main.models.enums.DailyGoal;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import com.undieb.hu.main.repositories.DailyGoalRepository;
import com.undieb.hu.main.repositories.MonthlyGoalRepository;
import com.undieb.hu.main.repositories.WeeklyGoalRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.time.DayOfWeek.SUNDAY;
import static java.time.temporal.TemporalAdjusters.nextOrSame;

@AllArgsConstructor
@Service
public class MonthlyGoalService {
    private final MonthlyGoalRepository monthlyGoalRepository;
    private final JWTService jwtService;
    private final GoalConverter goalConverter;
    private final DailyGoalRepository dailyGoalRepository;
    private final WeeklyGoalRepository weeklyGoalRepository;


    //---CREATE METHODS---//
    public MonthlyGoalDTO createGoal(CreateGoalRequest createGoalRequest, HttpServletRequest request){
        var userProfile = checkIfUserProfileExists(request);

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
                .currentWeight(userProfile.getWeight())
                .build();
        userProfile.addMonthlyGoal(newGoal);
        monthlyGoalRepository.save(newGoal);
        return goalConverter.monthlyGoalToMonthlyGoalDTO(newGoal);

    }

    @Transactional
    public String addExerciseToGoal(ExercisesDone exercisesDone,HttpServletRequest request){

        var userProfile = checkIfUserProfileExists(request);

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
            addNewWeaklyGoalAndExercise(latestGoal,exercisesDone);
            return "New Weekly goal created!";
        }

        var currentWeeklyGoal = weeklyGoal.stream().max(Comparator.comparing(WeeklyGoal::getStartOfTheWeek))
                .get();
        boolean exercisedToday = currentWeeklyGoal.getDailyGoals()
                .stream()
                .anyMatch(dg -> dg.getDateOfExercise().equals(LocalDate.now()));
        if (exercisedToday){
            addExerciseToDailyGoal(currentWeeklyGoal,exercisesDone);
            monthlyGoalRepository.save(latestGoal);
            return "New exercise saved to daily goals!";
        }
        createDailyGoal(exercisesDone,currentWeeklyGoal);
        monthlyGoalRepository.save(latestGoal);
        return "New daily goal created!";
    }

    //--GETTER METHODS--//
    public MonthlyGoalDTO getMonthlyGoalById(Long id){
        return monthlyGoalRepository.findById(id)
                .map(goalConverter::monthlyGoalToMonthlyGoalDTO)
                .orElseThrow(() -> new GoalNotFoundException("There is no goal with that id "));
    }


    //---DELETE METHODS---//
    public String deleteDailyGoal(Long dailyGoalId){
        var dailyGoal = dailyGoalRepository.findById(dailyGoalId)
                .orElseThrow(()->new GoalNotFoundException("Daily Goal not found"));
        var weeklyGoal = weeklyGoalRepository.findById(dailyGoal.getWeeklyGoal().getId())
                .orElseThrow(()->new GoalNotFoundException("Weekly Goal not found"));
        weeklyGoal.removeFromDailyGoals(dailyGoal);
        dailyGoalRepository.deleteById(dailyGoalId);
        return "Daily goal removed";
    }

    public String deleteMonthlyGoal(Long monthlyGoalId){
        if (monthlyGoalRepository.existsById(monthlyGoalId)) {
            monthlyGoalRepository.deleteById(monthlyGoalId);
            return "Monthly goal removed";
        }
        throw new GoalNotFoundException("The monthly goal was not found");
    }

    public String deleteWeeklyGoal(Long weeklyGoalId){
        var weeklyGoal = weeklyGoalRepository.findById(weeklyGoalId)
                .orElseThrow(()->new GoalNotFoundException("Weekly Goal not found"));
        var monthlyGoal = monthlyGoalRepository.findById(weeklyGoal.getMonthlyGoal().getMonthlyGoalId())
                .orElseThrow(()->new GoalNotFoundException("Monthly Goal not found"));
        monthlyGoal.removeFromWeeklyGoals(weeklyGoal);
        weeklyGoalRepository.deleteById(weeklyGoalId);
        return "Weekly Goal successfully deleted";
    }

    //---Helper Functions---//
    private void addExerciseToDailyGoal(WeeklyGoal weeklyGoal, ExercisesDone exercisesDone){
        var todayGoal = weeklyGoal.getDailyGoals()
                .stream()
                .filter(dg -> dg.getDateOfExercise().equals(LocalDate.now()))
                .findFirst().get();
        todayGoal.addToExercises(exercisesDone);
        weeklyGoal.setExercisesRemaining(weeklyGoal.getExercisesRemaining()-1);
        weeklyGoal.getMonthlyGoal().markExerciseDone();
    }

    private void createDailyGoal(ExercisesDone exercisesDone, WeeklyGoal weeklyGoal){
        var newDailyGoal = DailyGoal.builder()
                .exercisesDone(new ArrayList<>(List.of(exercisesDone)))
                .dateOfExercise(LocalDate.now())
                .build();
        weeklyGoal.addToDailyGoals(newDailyGoal);
        weeklyGoal.setExercisesRemaining(weeklyGoal.getExercisesRemaining()-1);
        weeklyGoal.getMonthlyGoal().markExerciseDone();
    }

    private void addNewWeaklyGoalAndExercise(MonthlyGoal monthlyGoal, ExercisesDone exercisesDone){
        int weeklyExercises = Math.max(
                1,
                calculateWeeklyExercises(
                        monthlyGoal.getExerciseType(),
                        monthlyGoal.getStartDate(),
                        monthlyGoal.getFinishDate()
                )
        );

        var newWeeklyGoal = WeeklyGoal.builder()
                .startOfTheWeek(LocalDate.now())
                .endOfTheWeek(LocalDate.now().with(nextOrSame(SUNDAY)))
                .exercisesRemaining(weeklyExercises)
                .dailyGoals(new ArrayList<>())
                .build();

        var newDailyGoal = DailyGoal.builder()
                .exercisesDone(new ArrayList<>(List.of(exercisesDone)))
                .dateOfExercise(LocalDate.now())
                .build();

        newWeeklyGoal.addToDailyGoals(newDailyGoal);
        monthlyGoal.addToWeeklyGoals(newWeeklyGoal);
        monthlyGoal.markExerciseDone();
        monthlyGoalRepository.save(monthlyGoal);
    }

    private UserProfile checkIfUserProfileExists(HttpServletRequest request){
        var user = jwtService.getUserFromRequest(request);
        var userProfile = user.getUserProfile();
        if (userProfile == null){
            throw new ProfileNotFoundException("You have to create a profile before setting a goal!");
        }
        return userProfile;
    }

    private Boolean checkLocalDateValidity(LocalDate endDate){
        return endDate.isBefore(LocalDate.now()) &&
                endDate.lengthOfMonth() - LocalDate.now().getDayOfMonth() < 7;
    }

    private int calculateWeeklyExercises(ExerciseTypeCalc exerciseTypeCalc, LocalDate startDate, LocalDate endDate) {
        int totalExercises = calculateExercisesToComplete(
                exerciseTypeCalc, startDate, endDate
        );

        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);

        int weeks = Math.max(1, (int) Math.ceil(daysBetween / 7.0));

        return (int) Math.ceil((double) totalExercises / weeks);
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
