package com.undieb.hu.main.controllers.DTOs.calculators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalorieResponseDTO {
    private int maintainCalories;
    private int mildWeightLossCalories;
    private int weightLossCalories;
    private int extremeWeightLossCalories;
    private int mildWeightGainCalories;
    private int weightGainCalories;
    private int extremeWeightGainCalories;
}
