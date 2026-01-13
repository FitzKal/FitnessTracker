import {ExerciseTypeCalc} from "./ExerciseTypeCalc.ts";
import {z} from "zod";

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
    weeklyGoals:weeklyGoal[]

}

export interface GoalProgressBarProps {
    startDate: Date | string;
    endDate: Date | string;
}


export const createGoalRequestSchema = z.object({
    exerciseType : z.enum(ExerciseTypeCalc),
    goalWeight:z.number("Goal Weight is required").min(40,"Target Weight should be higher"),
    endDate:z.date("Date is required for setting up a goal")
})

export type createGoalRequestType = z.infer<typeof createGoalRequestSchema>;

export const updateGoalRequestSchema = z.object({
    monthlyGoalId:z.number(),
    exerciseTypeCalc : z.enum(ExerciseTypeCalc),
    newGoalWeight:z.number("Goal Weight is required").min(40,"Target Weight should be higher"),
    newEndDate:z.date("Date is required for updating a goal"),
    newCurrentWeight:z.number("Current Weight is required").min(40,"Target Weight should be higher"),
})

export interface ExerciseDone {
    exerciseName?:string
    exerciseId?:string
}

export type updateGoalRequestType = z.infer<typeof updateGoalRequestSchema>;


