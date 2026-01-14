import api from "./AxiosConfig.ts";

//------------- GetAllWeeklyGoal -------------
export const getAllWeeklyGoals = async () => {
    try {
        return api.get("/goal/weeklyGoal")
            .then(res => res.data)
    }catch (error) {
        if (error instanceof Error){
            throw new Error(error.message);
        }else{
            throw error;
        }
    }
}

//------------- GetWeeklyGoalById -------------

export const getWeeklyGoalById = async (weeklyGoalId:string|undefined) => {
    try {
        return api.get(`/goal/weeklyGoal/${weeklyGoalId}`)
            .then(res => res.data)
    }catch (error) {
        if (error instanceof Error){
            throw new Error(error.message);
        }else{
            throw error;
        }
    }
}