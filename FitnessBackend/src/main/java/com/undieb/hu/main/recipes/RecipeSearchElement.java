package com.undieb.hu.main.recipes;

public record RecipeSearchElement(
        int id,
        String title,
        String image,
        String imageType,
        Nutrition nutrition
) {
}
