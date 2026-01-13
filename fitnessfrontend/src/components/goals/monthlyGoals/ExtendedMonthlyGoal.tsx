import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getCurrentDateYYYYMMDD, getMonthlyGoalById, parseYYYYMMDDToDate} from "../../../services/GoalService.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";
import GoalProgressBar from "../GoalProgressBar.tsx";
import DateProgressBar from "../DateProgressBar.tsx";
import type {weeklyGoal} from "../../../types/GoalType.ts";
import WeeklyGoalShowcase from "../weeklyGoals/WeeklyGoalShowcase.tsx";

export default function ExtendedMonthlyGoal(){
    const {params} = useParams();
    const goalId = params !== undefined ? String(params) : undefined;
    const {data, isLoading,error,isError} = useQuery({
        queryKey:["goalById",goalId],
        queryFn:async() => await getMonthlyGoalById(goalId),

    })

    useEffect(() => {
        if(isError){
            toast.error(error.message);
            console.log(error.message);
        }
    }, [error,isError]);

    if (isLoading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 p-6">
            <div>
                <h1 className={"text-center text-4xl"}>Monthly Goal</h1>
                <p className={"text-center text-4xl mt-2"}>From {data.startDate} To {data.finishDate}</p>
            </div>
            <div className={"flex justify-center mx-30 text-center flex-col"}>
                <p className={"text-2xl mt-2"}>Your weight goal</p>
                <div className={"flex justify-between"}>
                    <p>Your start weight: {data.currentWeight}</p>
                    <p>Your goal weight: {data.goalWeight}</p>
                </div>
                <GoalProgressBar currentWeight={data.currentWeight} goalWeight={data.goalWeight}/>
            </div>
            <div className={"flex justify-center my-10 flex-col mx-20"}>
                <div className="relative border-2 border-black p-6 rounded-md bg-white shadow-md">
                    <p
                          className="absolute -top-3 left-4 bg-red-100 px-3 rounded-full text-sm font-semibold">
                        Your Monthly goal
                    </p>
                    <div className="flex flex-col text-center lg:flex-row lg:justify-between">
                        <p>Start date: {data.startDate}</p>
                        <p>Current date: {getCurrentDateYYYYMMDD()}</p>
                        <p>Finish date: {data.finishDate}</p>
                    </div>
                    <div>
                        <DateProgressBar startDate={data.startDate} endDate={parseYYYYMMDDToDate(data.finishDate)}/>
                    </div>
                    <div>
                        <p>Remaining days to exercise: {data.exercisesRemaining}</p>
                        <p>Days exercised: {data.exercisesDone}</p>
                        <p>Current exercise style type selected: {data.exerciseType}</p>
                    </div>
               </div>
            </div>
            <div className="relative border-2 border-black p-6 rounded-md bg-white shadow-md mx-20">
                <p
                    className="absolute -top-3 left-4 bg-red-100 px-3 rounded-full text-sm font-semibold">
                    Your Weekly goals
                </p>
                {data.weeklyGoals.map((weeklyGoal:weeklyGoal,index:number) => {
                   return(
                       <div>
                           <h2 className={"text-xl"}>Week {index+1}</h2>
                           <WeeklyGoalShowcase weeklyGoal={weeklyGoal}/>
                       </div>
                       )
                })}
            </div>
        </div>
    );
}