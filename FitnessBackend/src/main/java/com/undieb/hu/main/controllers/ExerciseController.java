package com.undieb.hu.main.controllers;

import com.undieb.hu.main.exercises.ResponseFromAPI;
import com.undieb.hu.main.exercises.search.SearchResponseFromApi;
import com.undieb.hu.main.exercises.searchById.SearchByIdResponse;
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
    public ResponseEntity<ResponseFromAPI> getAllExercises(){
        var response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme(scheme)
                        .host(host)
                        .path(basePath + "exercises")
                        .build()
                ).retrieve()
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
