package com.undieb.hu.main.models.enums;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.undieb.hu.main.models.ExercisesDone;
import com.undieb.hu.main.models.WeeklyGoal;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

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
