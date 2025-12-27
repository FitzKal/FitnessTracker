import {z} from "zod";

export const ProteinSchema = z.object({
    height:z.number("Height is mandatory").min(1,"The height cannot be negative"),
    weight:z.number("Weight is mandatory").min(1,"The weight cannot be negative"),
    gender:z.enum(["MALE","FEMALE"]),
    age:z.number("Age is mandatory").min(1,"The age cannot be negative"),
    exerciseType:z.enum(["BASE", "SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "VERY_ACTIVE", "EXTRA_ACTIVE"])
});

export type userProteinIntakeRequest = z.infer<typeof ProteinSchema>

export type proteinResponse = {
    dataByADA:string,
    dataByCDC:string,
    dataByWHO:string
}