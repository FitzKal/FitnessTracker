package com.undieb.hu.main.exercises.types;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Equipment {
    ASSISTED,
    BAND,
    BARBELL,
    @JsonProperty("BATTLING ROPE")
    BATTLING_ROPE,
    @JsonProperty("BODY WEIGHT")
    BODY_WEIGHT,
    @JsonProperty("BOSU BALL")
    BOSU_BALL,
    CABLE,
    DUMBBELL,
    @JsonProperty("EZ BARBELL")
    EZ_BARBELL,
    HAMMER,
    KETTLEBELL,
    @JsonProperty("LEVERAGE MACHINE")
    LEVERAGE_MACHINE,
    @JsonProperty("MEDICINE BALL")
    MEDICINE_BALL,
    @JsonProperty("OLYMPIC BARBELL")
    OLYMPIC_BARBELL,
    @JsonProperty("POWER SLED")
    POWER_SLED,
    @JsonProperty("RESISTANCE BAND")
    RESISTANCE_BAND,
    ROLL,
    ROLLBALL,
    ROPE,
    @JsonProperty("SLED MACHINE")
    SLED_MACHINE,
    @JsonProperty("SMITH MACHINE")
    SMITH_MACHINE,
    @JsonProperty("STABILITY BALL")
    STABILITY_BALL,
    STICK,
    SUSPENSION,
    @JsonProperty("TRAP BAR")
    TRAP_BAR,
    @JsonProperty("VIBRATE PLATE")
    VIBRATE_PLATE,
    WEIGHTED,
    @JsonProperty("WHEEL ROLLER")
    WHEEL_ROLLER
}
