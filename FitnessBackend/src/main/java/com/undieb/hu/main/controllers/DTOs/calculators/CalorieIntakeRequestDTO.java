package com.undieb.hu.main.controllers.DTOs.calculators;

import com.undieb.hu.main.models.enums.ExerciseTypeCalc;
import com.undieb.hu.main.models.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalorieIntakeRequestDTO {
    private Double height;
    private Double weight;
    private int age;
    private Gender gender;
    private ExerciseTypeCalc exerciseTypeCalc;
}
