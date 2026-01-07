package com.undieb.hu.main.exercises.searchById;

import com.undieb.hu.main.exercises.types.BodyPart;
import com.undieb.hu.main.exercises.types.Equipment;
import com.undieb.hu.main.exercises.types.ExerciseType;
import com.undieb.hu.main.exercises.types.Muscles;

import java.util.List;

public record ExerciseById(
        String exerciseId,
        String name,
        List<Equipment> equipments,
        List<BodyPart> bodyParts,
        ExerciseType exerciseType,
        List<Muscles> targetMuscles,
        List<Muscles> secondaryMuscles,
        List<String> keywords,
        String overview,
        List<String> instructions,
        List<String> exerciseTips,
        List<String> variations,
        List<String> relatedExerciseIds,
        String videoUrl,
        String imageUrl,
        ImageUrls imageUrls
) {
}
