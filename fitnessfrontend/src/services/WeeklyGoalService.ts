//------------- WeeklyGoalService -------------
import api from "./AxiosConfig.ts";

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