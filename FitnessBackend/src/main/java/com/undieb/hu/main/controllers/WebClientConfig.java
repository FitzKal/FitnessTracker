package com.undieb.hu.main.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    WebClient exerciseWebClient (
            @Value("${rapidapi.key}") String apiKey,
            @Value("${rapidapi.host}") String host
    ){
        return WebClient.builder()
                .defaultHeader("X-RapidAPI-Key", apiKey)
                .defaultHeader("X-RapidAPI-Host", host)
                .build();
    }

    @Bean
    WebClient spoonacularWebClient (
            @Value("${spoonacular.key}") String apiKey
    ){

        return WebClient.builder().defaultHeader("x-api-key",apiKey)
                .build();
    }
}
