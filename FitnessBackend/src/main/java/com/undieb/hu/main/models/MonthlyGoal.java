package com.undieb.hu.main.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MonthlyGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long monthlyGoalId;
    private LocalDate startDate;
    private LocalDate finishDate;
    @Enumerated(EnumType.STRING)
    private ExerciseTypeCalc exerciseType;
    private Double goalWeight;
    private int exercisesDone;
    private int exercisesRemaining;
    private Double currentWeight;


    @ManyToOne(optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonBackReference
    private UserProfile userProfile;

    @OneToMany(mappedBy = "monthlyGoal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<WeeklyGoal> weeklyGoals = new ArrayList<>();

    public void addToWeeklyGoals(WeeklyGoal weeklyGoal){
        weeklyGoals.add(weeklyGoal);
        weeklyGoal.setMonthlyGoal(this);
    }

    public void removeFromWeeklyGoals(WeeklyGoal weeklyGoal){
        weeklyGoals.remove(weeklyGoal);
        weeklyGoal.setMonthlyGoal(null);
    }

    public void markExerciseDone() {
        this.exercisesDone++;
        this.exercisesRemaining--;
        if (this.exercisesRemaining < 0){
            setExercisesRemaining(0);
        }
    }

    public void markExerciseUnDone() {
        this.exercisesDone--;
        if (this.exercisesRemaining == 0){
            setExercisesRemaining(0);
        }else {
            this.exercisesRemaining++;
        }
        if (this.exercisesDone < 0){
            setExercisesDone(0);
        }
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        MonthlyGoal that = (MonthlyGoal) o;
        return getMonthlyGoalId() != null && Objects.equals(getMonthlyGoalId(), that.getMonthlyGoalId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
