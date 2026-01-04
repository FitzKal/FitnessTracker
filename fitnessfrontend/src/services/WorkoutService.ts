import api from "./AxiosConfig.ts";

// ------------- GetAllWorkouts ------------
export const getAllWorkouts = async (before?:string, after?:string) => {
    try {
        return api.get("/exercise",{
            params:{
                before:before?before:null,
                after:after?after:null
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
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}
