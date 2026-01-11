export const ExerciseTypeCalc = {
    BASE: "BASE",
    SEDENTARY: "SEDENTARY",
    LIGHT: "LIGHT",
    MODERATE: "MODERATE",
    ACTIVE: "ACTIVE",
    VERY_ACTIVE: "VERY_ACTIVE",
    EXTRA_ACTIVE: "EXTRA_ACTIVE",
} as const;

export type ExerciseTypeCalc =typeof ExerciseTypeCalc[keyof  typeof  ExerciseTypeCalc];
