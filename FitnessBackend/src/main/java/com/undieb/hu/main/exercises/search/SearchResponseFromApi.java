package com.undieb.hu.main.exercises.search;

import com.undieb.hu.main.exercises.Meta;

import java.util.List;

public record SearchResponseFromApi(
        boolean success,
        List<SearchedExerciseDTO> data
) {
}
