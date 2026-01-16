package com.undieb.hu.main.recipes;

public record Nutrients(
        String name,
        Double amount,
        String unit,
        Double percentOfDailyNeeds
) {
}
