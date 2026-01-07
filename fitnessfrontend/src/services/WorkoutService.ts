import api from "./AxiosConfig.ts";
import type {workoutFilterRequest} from "../types/WorkoutType.ts";

// ------------- GetAllWorkouts ------------
export const getAllWorkouts = async (before?:string, after?:string, filter?:workoutFilterRequest) => {
    try {
        return api.get("/exercise",{
            params:{
                before:before?before:null,
                after:after?after:null,
                name:filter?.name,
                exerciseType:filter?.exerciseType,
                bodyPart:filter?.bodyPart,
                equipment:filter?.equipment,
                targetMuscles:filter?.targetMuscles,
                secondaryMuscles:filter?.secondaryMuscles

            }
        })
            .then(res => res.data);
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

// ------------- GetWorkoutById ------------
export const getWorkoutById = async (exerciseId:string|undefined) =>{
    try{
        return api.get(`/exercise/${exerciseId}`).then(res => res.data)
            .then(res => res.data)
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

// ------------- GetWorkoutsBySearch ------------
export const getWorkoutBySearch = async (exerciseName:string|undefined) => {
    try {
        return api.get("/exercise/search",{
            params:{
                search:exerciseName
            }
        }).then(res => res.data)
            .then(res => res.data);
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}
