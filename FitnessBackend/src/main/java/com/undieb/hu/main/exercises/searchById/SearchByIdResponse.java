package com.undieb.hu.main.exercises.searchById;

import java.util.List;

public record SearchByIdResponse(
        boolean success,
        ExerciseById data
) {
}
