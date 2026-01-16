package com.undieb.hu.main.recipes;

import java.util.List;

public record RecipeWithInstructions(
    String name,
    List<Step> steps
) {
}
