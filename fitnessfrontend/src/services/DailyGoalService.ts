import api from "./AxiosConfig.ts";

//------------- GetAllDailyGoals -------------
export const getAllDailyGoals = async () => {
    try {
        return api.get("/goal/dailyGoal")
            .then(res => res.data)
    }catch (error){
        if (error instanceof Error){
            console.log(error)
            throw new Error(error.message);
        }else {
            throw error;
        }
    }

}

//------------- GetDailyGoalById -------------
export const getDailyGoalById = async (goalId:string|undefined) => {
    try {
        return api.get(`/goal/dailyGoal/${goalId}`)
            .then(res => res.data)
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            throw new Error(error.message);
        } else {
            throw error;
        }
    }
}