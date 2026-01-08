package com.undieb.hu.main.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.undieb.hu.main.models.enums.DailyGoal;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int exercisesRemaining;
    private LocalDate startOfTheWeek;
    private LocalDate endOfTheWeek;

    @ManyToOne(optional = false)
    @JsonBackReference
    @JoinColumn(name = "monthly_goal_id", nullable = false)
    private MonthlyGoal monthlyGoal;

    @OneToMany(mappedBy = "weeklyGoal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DailyGoal> dailyGoals = new ArrayList<>();

    public void addToDailyGoals(DailyGoal dailyGoal){
        dailyGoals.add(dailyGoal);
        dailyGoal.setWeeklyGoal(this);
    }

    public void removeFromDailyGoals(DailyGoal dailyGoal){
        dailyGoals.remove(dailyGoal);
        dailyGoal.setWeeklyGoal(null);
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        WeeklyGoal that = (WeeklyGoal) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
