package com.undieb.hu.main.services.helpers;

import com.undieb.hu.main.exceptions.GoalNotFoundException;
import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.UserProfile;
import com.undieb.hu.main.models.WeeklyGoal;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import com.undieb.hu.main.repositories.DailyGoalRepository;
import com.undieb.hu.main.repositories.MonthlyGoalRepository;
import com.undieb.hu.main.repositories.WeeklyGoalRepository;
import com.undieb.hu.main.services.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static java.time.DayOfWeek.SUNDAY;
import static java.time.temporal.TemporalAdjusters.nextOrSame;

import com.undieb.hu.main.models.enums.DailyGoal;

@Component
@AllArgsConstructor
public class MonthlyGoalHelper {
    private final MonthlyGoalRepository monthlyGoalRepository;
    private final DailyGoalRepository dailyGoalRepository;
    private final WeeklyGoalRepository weeklyGoalRepository;
    private final JWTService jwtService;

    // Add exercise to an existing DailyGoal (today)
    public void addExerciseToDailyGoal(WeeklyGoal weeklyGoal, ExercisesDone exercisesDone){
        var todayGoal = weeklyGoal.getDailyGoals()
                .stream()
                .filter(dg -> dg.getDateOfExercise().equals(LocalDate.now()))
                .findFirst().get();
        todayGoal.addToExercises(exercisesDone);
    }

    // Create a new DailyGoal for today and add the first exercise
    public void createDailyGoal(ExercisesDone exercisesDone, WeeklyGoal weeklyGoal){
        var newDailyGoal = DailyGoal.builder()
                .exercisesDone(new ArrayList<>(List.of(exercisesDone)))
                .dateOfExercise(LocalDate.now())
                .build();
        weeklyGoal.addToDailyGoals(newDailyGoal);
        weeklyGoal.setExercisesRemaining(weeklyGoal.getExercisesRemaining()-1);
        weeklyGoal.getMonthlyGoal().markExerciseDone();
    }

    // Create a new WeeklyGoal starting today and add today's DailyGoal with one exercise
    public void addNewWeaklyGoalAndExercise(MonthlyGoal monthlyGoal, ExercisesDone exercisesDone){
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

    // Fetch authenticated user's profile or throw if absent
    public UserProfile checkIfUserProfileExists(HttpServletRequest request){
        var user = jwtService.getUserFromRequest(request);
        var userProfile = user.getUserProfile();
        if (userProfile == null){
            throw new ProfileNotFoundException("You have to create a profile before setting a goal!");
        }
        return userProfile;
    }

    // Validate the provided end date
    public boolean checkLocalDateValidity(LocalDate endDate) {

        if (endDate == null) {
            return false;
        }

        long daysFromNow = ChronoUnit.DAYS.between(LocalDate.now(), endDate);
        if (daysFromNow < 7) {
            return false;
        }

        Optional<MonthlyGoal> latestGoalOpt =
                monthlyGoalRepository.findAll()
                        .stream()
                        .max(Comparator.comparing(MonthlyGoal::getFinishDate));

        if (latestGoalOpt.isEmpty()) {
            return true;
        }

        LocalDate latestFinishDate = latestGoalOpt.get().getFinishDate();

        return endDate.isAfter(latestFinishDate);
    }

    // Calculate planned exercises per week
    public int calculateWeeklyExercises(ExerciseTypeCalc exerciseTypeCalc, LocalDate startDate, LocalDate endDate) {
        int totalExercises = calculateExercisesToComplete(
                exerciseTypeCalc, startDate, endDate
        );

        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);

        int weeks = Math.max(1, (int) Math.ceil(daysBetween / 7.0));

        return (int) Math.ceil((double) totalExercises / weeks);
    }

    // Calculate total exercises to complete for the period
    public int calculateExercisesToComplete(ExerciseTypeCalc exerciseTypeCalc, LocalDate startDate, LocalDate endDate){
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

    // Repository helpers
    public com.undieb.hu.main.models.enums.DailyGoal fetchDailyGoalById(Long id){
        return dailyGoalRepository.findById(id)
                .orElseThrow(()->new GoalNotFoundException("Daily Goal not found"));
    }

    public WeeklyGoal fetchWeeklyGoalById(Long id){
        return weeklyGoalRepository.findById(id)
                .orElseThrow(()->new GoalNotFoundException("Weekly Goal not found"));
    }

    public MonthlyGoal fetchMonthlyGoalById(Long id){
        return monthlyGoalRepository.findById(id)
                .orElseThrow(()->new GoalNotFoundException("Monthly Goal not found"));
    }

    //---SAVE TO MONTHLY GOAL REPO---//
    public void saveToMonthlyGoalRepository(MonthlyGoal monthlyGoal){
        monthlyGoalRepository.save(monthlyGoal);
    }

    //---Count new number of exercises---//
    public int countNewNumberOfExercises(ExerciseTypeCalc exerciseTypeCalc, MonthlyGoal monthlyGoal,
    LocalDate newEndDate){
        if (exerciseTypeCalc == ExerciseTypeCalc.SEDENTARY){
            return 0;
        }else {
            int newTotal =
                    calculateExercisesToComplete(
                            exerciseTypeCalc,
                            monthlyGoal.getStartDate(),
                            newEndDate
                    );

           return newTotal-monthlyGoal.getExercisesDone();
        }
    }
}
