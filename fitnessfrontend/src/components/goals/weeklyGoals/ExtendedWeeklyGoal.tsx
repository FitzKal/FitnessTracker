import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getWeeklyGoalById} from "../../../services/WeeklyGoalService.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";
import DateProgressBar from "../DateProgressBar.tsx";
import type {dailyGoal} from "../../../types/GoalType.ts";
import DailyGoalListed from "../dailyGoals/DailyGoalListed.tsx";

export default function ExtendedWeeklyGoal(){
    const {params} = useParams();
    const goalId = params !== undefined ? String(params) : undefined;
    const {data, isLoading,isError, error} = useQuery({
        queryKey:["weeklyGoalById", goalId],
        queryFn:async () => await getWeeklyGoalById(goalId),

    })
    useEffect(() => {
        if (isError && error instanceof Error){
            toast.error(error.message);
            console.log(error)
        }else{
            console.log(error);
        }
    }, [error,isError]);
    if (isLoading){
        return <div className="text-center mt-20 text-xl">Loading...</div>
    }else {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 p-6">
                <div className={"flex flex-col text-center mb-5"}>
                    <h1 className={"text-xl lg:text-4xl"}>Weekly goal</h1>
                    <h2 className={"text-lg mt-5 lg:text-2xl"}>{data.startOfTheWeek} - {data.endOfTheWeek}</h2>
                </div>
                <div className={"mx-20"}>
                    <fieldset className={"border-2 p-6 shadow-md border-slate-200 bg-white"}>
                        <legend className={"ml-4 px-2 bg-blue-200 rounded-md"}>
                            <p>Weekly goal</p>
                        </legend>
                        <div>
                            <div className={"hidden lg:flex lg:justify-between"}>
                                <p>{data.startOfTheWeek.toString()}</p>
                                <p>{data.endOfTheWeek.toString()}</p>
                            </div>
                            <DateProgressBar startDate={data.startOfTheWeek} endDate={data.endOfTheWeek}/>
                        </div>
                        <div
                            className={"grid grid-cols-1 text-center mt-2 lg:grid-cols-2 lg:gap-5 sm:justify-items-center lg:text-left"}>
                            <span>Days to exercise remaining: {data.exercisesRemaining}</span>
                            <span>Days exercised: {data.dailyGoals.length} </span>
                        </div>
                        <div className={"mt-2 flex justify-center"}>
                            <button className={"px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}>
                                Delete goal
                            </button>
                        </div>
                    </fieldset>
                    <div className={"border-b-2 mt-10"}>
                        <h3 className={"text-xl"}>Recorded days exercised this week</h3>
                    </div>
                    <div className={"grid grid-cols-1 mt-5 lg:grid-cols-3 gap-5"}>
                        {data.dailyGoals.map((dailyGoal:dailyGoal)=>{
                            return <DailyGoalListed dailyGoal={dailyGoal}/>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}