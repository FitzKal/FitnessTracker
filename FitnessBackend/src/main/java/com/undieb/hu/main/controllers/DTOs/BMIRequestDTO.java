package com.undieb.hu.main.controllers.DTOs;

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
