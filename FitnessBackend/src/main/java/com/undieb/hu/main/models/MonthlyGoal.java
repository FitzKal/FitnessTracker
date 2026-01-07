package com.undieb.hu.main.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Date;
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
    private Date startDate;
    private Date finishDate;
    private ExerciseTypeCalc exerciseType;
    private Double goalWeight;
    private int exercisesDone;
    private int exercisesRemaining;
    private Double currentWeight;


    @ManyToOne(optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonBackReference
    private UserProfile userProfile;

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
