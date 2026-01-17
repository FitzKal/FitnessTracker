package com.undieb.hu.main.controllers;

import com.undieb.hu.main.recipes.RecipeSearchResult;
import com.undieb.hu.main.recipes.RecipeWithInstructions;
import com.undieb.hu.main.recipes.enums.CuisineFromCountries;
import com.undieb.hu.main.recipes.enums.DietType;
import com.undieb.hu.main.recipes.enums.MealType;
import com.undieb.hu.main.recipes.enums.SortOptions;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Objects;

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

    @PostMapping("/search")
    public ResponseEntity<RecipeSearchResult> getRecipesBySearch(
            @RequestParam String query,
            @RequestParam(required = false) Integer number,
            @RequestParam(required = false) CuisineFromCountries cuisineFromCountries,
            @RequestParam(required = false) DietType dietType,
            @RequestParam(required = false) MealType mealType,
            @RequestParam(required = false) Boolean addRecipeNutrition,
            @RequestParam(required = false) SortOptions sortOption,
            @RequestParam String sortDirection
            ){
        var response = webClient.get()
                .uri(uriBuilder -> {
                    var builder = uriBuilder
                            .scheme(scheme)
                            .host(host)
                            .path(basePath + "/complexSearch")
                            ;
                    builder.queryParam("query",query);
                    builder.queryParam("addRecipeNutrition", Objects.requireNonNullElse(addRecipeNutrition, false));
                    if (sortOption != null) builder.queryParam("sort",sortOption);
                    builder.queryParam("sortDirection",sortDirection);
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

    @GetMapping("/random")
    public ResponseEntity<RecipeSearchResult> getRandomRecipe(
            @RequestParam(required = false) Integer number,
            @RequestParam(required = false) Boolean addRecipeNutrition
    ){
        var response = webClient.get()
                .uri(uriBuilder -> {
                    var builder = uriBuilder
                            .scheme(scheme)
                            .host(host)
                            .path(basePath + "/complexSearch");
                    builder.queryParam("addRecipeNutrition", Objects.requireNonNullElse(addRecipeNutrition, false));
                    if (number != null) builder.queryParam("number",number);
                    return builder.build();
                })
                .retrieve()
                .bodyToMono(RecipeSearchResult.class)

                .block();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<RecipeWithInstructions>> getRecipeWithInstructions(
            @PathVariable int id,
            @RequestParam(required = false) Integer recipeId
    ){
        var response = webClient.get()
                .uri(uriBuilder -> {
                    var builder = uriBuilder
                            .scheme(scheme)
                            .host(host)
                            .path(basePath +"/"+id+"/analyzedInstructions");
                    builder.queryParam("stepBreakdown",true);
                    return builder.build();
                })
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<RecipeWithInstructions>>() {})
                .block();
        return ResponseEntity.ok(response);
    }
}
