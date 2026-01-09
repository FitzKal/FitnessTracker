package com.undieb.hu.main.models.enums;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.undieb.hu.main.exceptions.ExerciseNotFoundException;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.models.WeeklyGoal;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.security.core.parameters.P;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class DailyGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate dateOfExercise;
    @ElementCollection
    private List<ExercisesDone> exercisesDone;

    @ManyToOne(optional = false)
    @JsonBackReference
    private WeeklyGoal weeklyGoal;

    public void addToExercises(ExercisesDone exerciseDone){
        boolean isExerciseDone = exercisesDone.stream()
                .anyMatch(e -> e.getExerciseId().equals(exerciseDone.getExerciseId()));
        if (isExerciseDone){
            var doneExercise = exercisesDone.stream()
                    .filter(e->e.getExerciseId().equals(exerciseDone.getExerciseId()))
                    .findFirst().get();
            doneExercise.setNumberOfCompletion(doneExercise.getNumberOfCompletion() + 1);
        }else {
            exerciseDone.setNumberOfCompletion(1);
            exercisesDone.add(exerciseDone);
        }

    }

    public void deleteFromExercises(String id){
        var exercise = exercisesDone.stream()
                .filter(exercisesDone1 -> exercisesDone1.getExerciseId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ExerciseNotFoundException("Exercise not Found"));
        if (exercise.getNumberOfCompletion() > 1){
            exercise.setNumberOfCompletion(exercise.getNumberOfCompletion()-1);
        }else{
            exercisesDone.remove(exercise);
            if (exercisesDone.isEmpty()){
                weeklyGoal.setExercisesRemaining(weeklyGoal.getExercisesRemaining() + 1);
                weeklyGoal.getMonthlyGoal().markExerciseUnDone();
            }
        }
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        DailyGoal dailyGoal = (DailyGoal) o;
        return getId() != null && Objects.equals(getId(), dailyGoal.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
