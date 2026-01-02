package com.undieb.hu.main.exercises;

import com.undieb.hu.main.exercises.types.BodyPart;
import com.undieb.hu.main.exercises.types.Equipment;
import com.undieb.hu.main.exercises.types.ExerciseType;
import com.undieb.hu.main.exercises.types.Muscles;

import java.util.List;

public record ListedExercisesDTO(
        String exerciseId,
        String name,
        String imageUrl,
        List<BodyPart> bodyParts,
        List<Equipment> equipments,
        ExerciseType exerciseType ,
        List<Muscles> targetMuscles,
        List<Muscles> secondaryMuscles
) {
}
