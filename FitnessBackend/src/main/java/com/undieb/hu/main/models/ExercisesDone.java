package com.undieb.hu.main.models;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class ExercisesDone{
    private String exerciseName;
    private String exerciseId;
    private int numberOfCompletion;
}
