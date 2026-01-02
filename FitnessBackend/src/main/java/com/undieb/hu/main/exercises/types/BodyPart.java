package com.undieb.hu.main.exercises.types;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum BodyPart {
    BACK,
    CALVES,
    CHEST,
    FOREARMS,
    HIPS,
    NECK,
    SHOULDERS,
    THIGHS,
    WAIST,
    HANDS,
    FEET,
    FACE,
    @JsonProperty("FULL BODY")
    FULL_BODY,
    BICEPS,
    @JsonProperty("UPPER ARMS")
    UPPER_ARMS,
    TRICEPS,
    HAMSTRINGS,
    QUADRICEPS
}
