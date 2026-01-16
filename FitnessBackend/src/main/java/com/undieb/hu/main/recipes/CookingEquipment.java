package com.undieb.hu.main.recipes;

public record CookingEquipment(
        int id,
        String image,
        String name,
        Temperature temperature
) {
}
