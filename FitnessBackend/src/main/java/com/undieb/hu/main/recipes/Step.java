package com.undieb.hu.main.recipes;

import java.util.List;

public record Step(
        List<CookingEquipment> equipment,
        List<Ingredient>ingredients,
        int number,
        String step
) {
}
