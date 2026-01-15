import {Link, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getWeeklyGoalById} from "../../../services/WeeklyGoalService.ts";
import {useState} from "react";
import {toast} from "react-toastify";
import DateProgressBar from "../DateProgressBar.tsx";
import type {dailyGoal} from "../../../types/GoalType.ts";
import DailyGoalListed from "../dailyGoals/DailyGoalListed.tsx";
import axios from "axios";
import DeleteWeeklyGoalForm from "../forms/DeleteWeeklyGoalForm.tsx";
import {ChevronLeftIcon} from "@heroicons/react/16/solid";

export default function ExtendedWeeklyGoal(){
    const {params} = useParams();
    const [isDeleting,setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();
    const goalId = params !== undefined ? String(params) : undefined;
    const {data, isLoading} = useQuery({
        queryKey:["weeklyGoalById", goalId],
        queryFn:async () => await getWeeklyGoalById(goalId),
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                navigate("/Fitness/goals/weeklyGoals");
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        },

    })
    const deleteHandler = () => {
        if (isDeleting){
            setIsDeleting(false)
        }else {
            setIsDeleting(true)
        }
    }
    if (isLoading){
        return <div className="text-center mt-20 text-xl">Loading...</div>
    }else {
        return (
            <div className="min-h-screen bg-gray-50 pb-10">
                <DeleteWeeklyGoalForm goalDetails={data} isDeleting={isDeleting} deleteHandler={deleteHandler}/>
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-3xl mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Weekly Goal</h1>
                                <div className={"flex space-x-1"}>
                                    <p className="text-blue-600 font-medium mt-1 text-lg">{data.startOfTheWeek.toString()} - </p>
                                    <p className="text-blue-600 font-medium mt-1 text-lg">{data.endOfTheWeek.toString()}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3 text-sm font-medium">
                                <Link to={`/Fitness/goals/monthlyGoals/${data.parentMonthId}`} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                                    <ChevronLeftIcon className="w-4 h-4 mr-1" />
                                    Month
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"mx-20 mt-10"}>
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
                        <div className={"mt-2 grid grid-cols-1 lg:grid-cols-2 text-center justify-items-center"}>
                            <Link to={`/Fitness/goals/monthlyGoals/${data.parentMonthId}`}
                                  className={"px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-md transition-colors mt-2 lg:mt-0"}
                            >To Parent month</Link>
                            <button className={"px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors mt-2 lg:mt-0"}
                            onClick={deleteHandler}>
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