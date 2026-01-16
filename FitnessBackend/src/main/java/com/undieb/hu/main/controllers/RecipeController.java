package com.undieb.hu.main.controllers;

import com.undieb.hu.main.recipes.RecipeSearchResult;
import com.undieb.hu.main.recipes.enums.CuisineFromCountries;
import com.undieb.hu.main.recipes.enums.DietType;
import com.undieb.hu.main.recipes.enums.MealType;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/api/fitness/recipe")
public class RecipeController {
    private final String host = "api.spoonacular.com";
    private final String scheme = "https";
    private final String basePath = "/recipes";
    private final WebClient webClient;

    public RecipeController(
            @Qualifier("spoonacularWebClient")WebClient webClient) {
        this.webClient = webClient;
    }

    @GetMapping("/search")
    public ResponseEntity<RecipeSearchResult> getRecipesBySearch(
            @RequestParam String query,
            @RequestParam(required = false) Integer number,
            @RequestParam(required = false) CuisineFromCountries cuisineFromCountries,
            @RequestParam(required = false) DietType dietType,
            @RequestParam(required = false)MealType mealType
            ){
        var response = webClient.get()
                .uri(uriBuilder -> {
                    var builder = uriBuilder
                            .scheme(scheme)
                            .host(host)
                            .path(basePath + "/complexSearch")
                            ;
                    builder.queryParam("query",query);
                    builder.queryParam("addRecipeNutrition",true);
                    builder.queryParam("addRecipeInformation",true);
                    if (number != null) builder.queryParam("number",number);
                    if (cuisineFromCountries != null) builder.queryParam("cuisine",cuisineFromCountries);
                    if (dietType != null) builder.queryParam("diet",dietType);
                    if (mealType != null) builder.queryParam("type",mealType);


                    return builder.build();
                })
                .retrieve()
                .bodyToMono(RecipeSearchResult.class)

                .block();
        return ResponseEntity.ok(response);
    }
}
