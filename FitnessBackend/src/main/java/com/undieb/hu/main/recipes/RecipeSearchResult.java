package com.undieb.hu.main.recipes;

import java.util.List;

public record RecipeSearchResult(
        List<RecipeSearchElement> results,
        int number,
        int totalResults

) {
}
