package com.undieb.hu.main.recipes;

import java.util.List;

public record RandomRecipeResponse(
        List<RecipeSearchElement> recipes
) {
}
