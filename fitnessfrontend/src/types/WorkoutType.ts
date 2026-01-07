import {BodyPart, Equipment, type ExerciseType, Muscles} from "./WorkoutEnums.ts";

export interface WorkoutListElement{
    exerciseId:string,
    name:string,
    imageUrl:string,
    bodyParts:BodyPart[],
    equipments:Equipment[],
    secondaryMuscles:Muscles[],
    targetMuscles:Muscles[]
}

export interface WorkoutById{
    exerciseId:string,
    name:string,
    equipments:Equipment[],
    bodyParts:BodyPart[],
    exerciseType:ExerciseType,
    targetMuscles:Muscles[],
    secondaryMuscles:Muscles[],
    exerciseTips:string[],
    variations:string[],
    relatedExerciseIds:string[],
    instructions:string[],
    videoUrl:string,
    imageUrl:string,
    imageUrls:{
        "480p":string,
        "720p":string,
        "1080p":string
    }
}

export interface workoutFilterRequest {
    name?:string,
    targetMuscles?:Muscles,
    secondaryMuscles?:Muscles,
    exerciseType?:ExerciseType,
    bodyPart?:BodyPart,
    equipment?:Equipment
}

export interface WorkoutSearch{
    exerciseId:string,
    name?:string,
    imageUrl:string,
}