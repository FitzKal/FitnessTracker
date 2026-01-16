import {useQuery} from "@tanstack/react-query";
import {getAllDailyGoals} from "../../../services/DailyGoalService.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";
import type {dailyGoal} from "../../../types/GoalType.ts";
import DailyGoalListElement from "./DailyGoalListElement.tsx";

export default function DisplayAllDailyGoals(){
    const {data,isLoading,error,isError} = useQuery({
        queryKey:["getAllDailyGoals"],
        queryFn:async () => await getAllDailyGoals(),

    })
    useEffect(() => {
        if (isError && error instanceof Error){
            toast.error(error.message);
            console.log(error)
        }else {
            console.log(error)
        }
    }, [error,isError]);

    if (isLoading){
        return <div className="text-center mt-20 text-xl">Loading...</div>
    }else {
        return (
            <div className={"min-h-screen"}>
                <div className={"text-center"}>
                    <h1 className={"text-2xl lg:text-4xl"}>All Recorded Daily Goals</h1>
                </div>
                <div className={"mx-20 grid grid-cols-1 lg:grid-cols-3 lg:gap-5 mt-10"}>
                    {
                        data.map((dailyGoal:dailyGoal) =>{
                            return(
                                <div>
                                    <DailyGoalListElement dailyGoal={dailyGoal} key={dailyGoal.id}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    };
}