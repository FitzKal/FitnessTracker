//------------- GetAllGoals -------------
import api from "./AxiosConfig.ts";

export const getAllGoals = ()=>{
    try{
        return api.get("/goal")
            .then(res => res.data);
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}