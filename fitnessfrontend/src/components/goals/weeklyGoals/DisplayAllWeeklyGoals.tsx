import {useQuery} from "@tanstack/react-query";
import {getAllWeeklyGoals} from "../../../services/WeeklyGoalService.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";
import WeeklyGoalListElement from "./WeeklyGoalListElement.tsx";
import type {weeklyGoal} from "../../../types/GoalType.ts";

export default function DisplayAllWeeklyGoals(){
    const {data, isLoading,isError, error} = useQuery({
        queryKey:["allWeeklyGoals"],
        queryFn:async () => await getAllWeeklyGoals(),

    })
    useEffect(() => {
        if (isError && error instanceof Error){
            toast.error(error.message);
            console.log(error)
        }else{
            console.log(error);
        }
    }, [error,isError]);

    useEffect(() => {
        if (!isLoading){
            console.log(data);
        }
    }, [isLoading,data]);

    if (isLoading){
       return <div className="text-center mt-20 text-xl">Loading...</div>
    }else {
        return(
            <div className={"min-h-screen bg-gradient-to-b from-white to-blue-100"}>
                <div className={"text-center my-5 text-xl lg:text-4xl"}>
                    <h1>All of your recorded weekly goals</h1>
                </div>
                <div className={"mx-20 grid grid-cols-1 lg:grid-cols-3 lg:gap-5"}>
                    {
                        data.map((weeklyGoal:weeklyGoal) =>{
                            return(
                                <div>
                                    <WeeklyGoalListElement weeklyGoal={weeklyGoal}/>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}