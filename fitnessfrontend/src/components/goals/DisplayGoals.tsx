import {use, useState} from "react";
import {getAllGoals, getCurrentDateYYYYMMDD, parseYYYYMMDDToDate} from "../../services/GoalService.ts";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import GoalProgressBar from "./GoalProgressBar.tsx";
import DateProgressBar from "./DateProgressBar.tsx";
import {Link} from "react-router-dom";
import CreateGoalForm from "./forms/CreateGoalForm.tsx";

export default function DisplayGoals(){

    const [isCreating,setIsCreating] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const {data, isLoading,isError,error} = useQuery({
        queryKey:["allGoals"],
        queryFn:async() => await getAllGoals(),
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        },
    })

    const handleCreating = () => {
        if (isCreating){
            setIsCreating(false);
        }else{
            setIsCreating(true);
        }
    }

    const handleUpdating = () => {
        if (isUpdating){
            setIsUpdating(false);
        }else{
            setIsUpdating(true);
        }
    }

    const missingGoal = isError && axios.isAxiosError(error) && error.response?.status === 404;
   if (isLoading && !missingGoal){
       return (
           <div className="flex justify-center text-center h-screen">
               <h1 className="text-4xl font-semibold text-blue-800">Loading Goals...</h1>
           </div>
       );
   }else{
       return (
         <div className={"min-h-screen bg-gradient-to-b from-white to-blue-100"}>
             <CreateGoalForm isUpdating={isCreating} updateHandler={handleCreating}/>
             <div className={"text-center text-4xl"}>
                 <p>Welcome to the goal tracker!</p>
             </div>
             <div className={"flex justify-center mx-30 text-center flex-col"}>
                 <p className={"text-lg mt-5"}>Your current weight goal</p>
                 <div className={"flex justify-between"}>
                    <p>Your current weight: {data[0].currentWeight}</p>
                     <p>Your goal weight: {data[0].goalWeight}</p>
                 </div>
                 <GoalProgressBar currentWeight={data[0].currentWeight} goalWeight={data[0].goalWeight}/>
             </div>

             <div className={"flex justify-center"}>
                 <button
                     className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl shadow-md transition-colors mt-5"
                     onClick={handleCreating}>Add new goal</button>
             </div>

             <div className={"flex justify-center my-10 flex-col mx-20"}>
                 <div className="relative border-2 border-black p-6 rounded-md bg-white shadow-md">
                              <Link to={`/Fitness/goals/monthlyGoals/${data[0].monthlyGoalId}`}
                                    className="absolute -top-3 left-4 bg-red-100 px-3 rounded-full text-sm font-semibold hover:text-blue-700">
                                Your current Monthly goal
                              </Link>
                     <div className="flex flex-col text-center lg:flex-row lg:justify-between">
                         <p>Start date: {data[0].startDate}</p>
                         <p>Current date: {getCurrentDateYYYYMMDD()}</p>
                         <p>Finish date: {data[0].finishDate}</p>
                     </div>
                     <div>
                         <DateProgressBar startDate={data[0].startDate} endDate={parseYYYYMMDDToDate(data[0].finishDate)}/>
                     </div>
                     <div>
                         <p>Remaining days to exercise: {data[0].exercisesRemaining}</p>
                         <p>Days exercised: {data[0].exercisesDone}</p>
                         <p>Recorded weeks: {data[0].weeklyGoals.length}</p>
                         <p>Current exercise style type selected: {data[0].exerciseType}</p>
                     </div>
                     <div className={"grid lg:grid-cols-3 justify-items-center sm:grid-cols-1 mt-5 sm: gap-y-2"}>
                         <Link to={"/Fitness/workouts"} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-2xl shadow-md transition-colors">Add new weekly goal</Link>
                         <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                         >Edit Goal</button>
                         <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors">Delete Goal</button>
                     </div>
                     <div className={"mt-5"}>
                         <Link to={`/Fitness/goals/monthlyGoals/${data[0].monthlyGoalId}`}
                         className={"hover:text-blue-700"}>To check out your detailed progress statistics for ths goal click here, or the goal name!</Link>
                     </div>
                 </div>
             </div>
         </div>
       );
   }
}