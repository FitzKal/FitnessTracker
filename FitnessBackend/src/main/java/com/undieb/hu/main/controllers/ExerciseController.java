package com.undieb.hu.main.controllers;

import com.undieb.hu.main.exercises.ResponseFromAPI;
import com.undieb.hu.main.exercises.search.SearchResponseFromApi;
import com.undieb.hu.main.exercises.searchById.SearchByIdResponse;
import com.undieb.hu.main.exercises.types.BodyPart;
import com.undieb.hu.main.exercises.types.Equipment;
import com.undieb.hu.main.exercises.types.ExerciseType;
import com.undieb.hu.main.exercises.types.Muscles;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;


@RestController
@RequestMapping("/api/fitness/exercise")
@AllArgsConstructor
public class ExerciseController {

    private final String host = "exercisedb-api1.p.rapidapi.com";
    private final String scheme = "https";
    private final String basePath = "/api/v1/";
    private WebClient webClient;


    @GetMapping
    public ResponseEntity<ResponseFromAPI> getAllExercises(
            @RequestParam(required = false) String after,
            @RequestParam(required = false) String before,
            @RequestParam(required = false) String name,
            @RequestParam(required = false)ExerciseType exerciseType,
            @RequestParam(required = false)BodyPart bodyPart,
            @RequestParam(required = false)Equipment equipment,
            @RequestParam(required = false)Muscles targetMuscles,
            @RequestParam(required = false)Muscles secondaryMuscles
            ){
        var response = webClient.get()
                .uri(uriBuilder -> {
                    var builder = uriBuilder
                            .scheme(scheme)
                            .host(host)
                            .path(basePath + "exercises");
                    if (name != null) builder.queryParam("name",name);
                    if (exerciseType != null) builder.queryParam("exerciseType",exerciseType);
                    if (bodyPart != null) builder.queryParam("bodyPart",bodyPart);
                    if (equipment != null) builder.queryParam("equipment",equipment);
                    if (targetMuscles != null) builder.queryParam("targetMuscles", targetMuscles);
                    if (secondaryMuscles != null) builder.queryParam("secondaryMuscles",secondaryMuscles);
                    if (after != null) builder.queryParam("after", after);
                    if (before != null) builder.queryParam("before", before);
                    return builder.build();
                })
                .retrieve()
                .bodyToMono(ResponseFromAPI.class)
                .block();

        return ResponseEntity.ok(response);
    }


    @GetMapping("/search")
    public ResponseEntity<SearchResponseFromApi> getExerciseBySearch(@RequestParam String search){
        return ResponseEntity.ok(
                webClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .scheme(scheme)
                                .host(host)
                                .path(basePath)
                                .path("exercises/search")
                                .queryParam("search",search)
                                .build())
                        .retrieve()
                        .bodyToMono(SearchResponseFromApi.class)
                        .block()
        );
    }

    @GetMapping("/{exerciseId}")
    public ResponseEntity<SearchByIdResponse> getExerciseById(@PathVariable String exerciseId){
        return ResponseEntity.ok(
                webClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .scheme(scheme)
                                .host(host)
                                .path(basePath)
                                .path("/exercises/"+exerciseId)
                                .build())
                        .retrieve()
                        .bodyToMono(SearchByIdResponse.class)
                        .block()
        );
    }
}
