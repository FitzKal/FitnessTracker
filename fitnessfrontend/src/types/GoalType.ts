import {ExerciseTypeCalc} from "./ExerciseTypeCalc.ts";

export interface dailyGoal {
    id:number,
    dateOfExercise:Date,
    exercisesDone:ExercisesDone[]
}

export type ExercisesDone = {
    exerciseName:string,
    exerciseId:string,
    numberOfCompletion:number
}

export interface weeklyGoal {
    id:number,
    exercisesRemaining:number,
    startOfTheWeek:Date,
    endOfTheWeek:Date,
    dailyGoals:dailyGoal[]
}

export interface MonthlyGoal{
    monthlyGoalId:number,
    startDate:Date,
    finishDate:Date,
    exerciseType:ExerciseTypeCalc,
    goalWeight:number,
    exercisesDone:number,
    exercisesRemaining:number,
    currentWeight:number,
    weeklyGoals:weeklyGoal

}



