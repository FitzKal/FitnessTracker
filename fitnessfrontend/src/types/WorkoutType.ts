import {BodyPart, Equipment, Muscles} from "./WorkoutEnums.ts";

export interface WorkoutListElement{
    exerciseId:string,
    name:string,
    imageUrl:string,
    bodyParts:BodyPart[],
    equipments:Equipment[],
    secondaryMuscles:Muscles[],
    targetMuscles:Muscles[]
}