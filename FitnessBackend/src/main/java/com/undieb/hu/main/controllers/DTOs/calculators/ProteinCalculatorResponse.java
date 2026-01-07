package com.undieb.hu.main.controllers.DTOs.calculators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProteinCalculatorResponse {
    private String dataByADA;
    private String dataByCDC;
    private double dataByWHO;
}
