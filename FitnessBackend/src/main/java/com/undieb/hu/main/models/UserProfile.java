package com.undieb.hu.main.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.undieb.hu.main.models.enums.Gender;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;
    private String profilePictureName;
    private String profilePictureSrc;
    private String firstName;
    private String lastName;
    private Double weight;
    private Double height;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private int age;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private Users user;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MonthlyGoal> monthlyGoals = new ArrayList<>();

    public void addMonthlyGoal(MonthlyGoal goal) {
        monthlyGoals.add(goal);
        goal.setUserProfile(this);
    }

}
