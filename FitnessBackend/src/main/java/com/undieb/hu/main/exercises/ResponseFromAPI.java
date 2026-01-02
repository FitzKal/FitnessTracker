package com.undieb.hu.main.exercises;

import java.util.List;

public record ResponseFromAPI(
        boolean success,
        Meta meta,
        List<ListedExercisesDTO> data
) {
}
