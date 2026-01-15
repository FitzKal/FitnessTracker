import {Link, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getCurrentDateYYYYMMDD, getMonthlyGoalById, parseYYYYMMDDToDate} from "../../../services/GoalService.ts";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import GoalProgressBar from "../GoalProgressBar.tsx";
import DateProgressBar from "../DateProgressBar.tsx";
import type {weeklyGoal} from "../../../types/GoalType.ts";
import WeeklyGoalShowcase from "../weeklyGoals/WeeklyGoalShowcase.tsx";
import UpdateGoalForm from "../forms/UpdateGoalForm.tsx";
import DeleteMonthlyGoalForm from "../forms/DeleteMonthlyGoalForm.tsx";
import axios from "axios";

export default function ExtendedMonthlyGoal(){
    const {params} = useParams();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting,setIsDeleting] = useState<boolean>(false);
    const goalId = params !== undefined ? String(params) : undefined;
    const navigate = useNavigate();
    const {data, isLoading,error,isError} = useQuery({
        queryKey:["goalById",goalId],
        queryFn:async() => await getMonthlyGoalById(goalId),
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                navigate("/Fitness/goals/monthlyGoals");
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        },

    })

    useEffect(() => {
        if(isError){
            toast.error(error.message);
            console.log(error.message);
        }
    }, [error,isError]);

    const handleUpdating = () => {
        if (isUpdating){
            setIsUpdating(false);
        }else{
            setIsUpdating(true);
        }
    }

    const handleDeleting = () => {
        if (isDeleting){
            setIsDeleting(false);
        }else{
            setIsDeleting(true);
        }
    }

    if (isLoading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <UpdateGoalForm defaultGoalDetails={data} isUpdating={isUpdating} updateHandler={handleUpdating}/>
            <DeleteMonthlyGoalForm goalDetails={data} isDeleting={isDeleting} deleteHandler={handleDeleting}/>

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
                <fieldset className="border-2 border-black p-6 rounded-md bg-white shadow-md">
                    <legend className="bg-red-100 px-3 rounded-full text-sm font-semibold ml-4">
                        Your Monthly goal
                    </legend>

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

                    <div className={"grid lg:grid-cols-3 justify-items-center sm:grid-cols-1 mt-5 gap-y-2"}>
                        <Link to={"/Fitness/workouts"} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-2xl shadow-md transition-colors">Add new weekly goal</Link>
                        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                                onClick={handleUpdating} >Edit Goal</button>
                        <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                                onClick={handleDeleting}>Delete Goal</button>
                    </div>
                </fieldset>

            </div>
            <fieldset className="border-2 border-black p-6 rounded-md bg-white shadow-md mx-20 mb-10">
                <legend className="bg-red-100 px-3 rounded-full text-sm font-semibold ml-4">
                    Your Weekly goals
                </legend>

                {
                    data.weeklyGoals.length < 1 ?
                        <div>
                            <p>You have not recorded an exercise this week!</p>
                        </div>
                        :
                        data.weeklyGoals.map((weeklyGoal: weeklyGoal, index: number) => {
                            return(
                                <div key={index} className={"mb-5"}>
                                    <Link to={`/Fitness/goals/weeklyGoals/${weeklyGoal.id}`} className={"text-xl hover:text-blue-700"}>Week {index+1}</Link>
                                    <WeeklyGoalShowcase weeklyGoal={weeklyGoal}/>
                                </div>
                            )
                        })
                }

            </fieldset>

        </div>
    );
}