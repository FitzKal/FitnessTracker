import {z} from "zod";

export const IntakeSchema = z.object({
    height:z.number("Height is mandatory").min(1,"The height cannot be negative"),
    weight:z.number("Weight is mandatory").min(1,"The weight cannot be negative"),
    gender:z.enum(["MALE","FEMALE"]),
    age:z.number("Age is mandatory").min(1,"The age cannot be negative"),
    exerciseTypeCalc:z.enum(["BASE", "SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "VERY_ACTIVE", "EXTRA_ACTIVE"])
});

export type IntakeRequest = z.infer<typeof IntakeSchema>

export type proteinResponse = {
    dataByADA:string,
    dataByCDC:string,
    dataByWHO:string
}

export type calorieResponse = {
    maintainCalories:number,
    mildWeightLossCalories:number,
    weightLossCalories:number,
    extremeWeightLossCalories:number,
    mildWeightGainCalories:number,
    weightGainCalories:number,
    extremeWeightGainCalories:number
}