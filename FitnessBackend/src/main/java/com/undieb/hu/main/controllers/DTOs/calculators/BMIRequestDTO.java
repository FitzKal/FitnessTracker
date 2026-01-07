package com.undieb.hu.main.controllers.DTOs.calculators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BMIRequestDTO {
    private double height;
    private double weight;
}
