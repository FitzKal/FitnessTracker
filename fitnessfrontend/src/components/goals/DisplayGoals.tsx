import {useState} from "react";
import {getAllGoals} from "../../services/GoalService.ts";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import GoalProgressBar from "./GoalProgressBar.tsx";
import {useNavigate} from "react-router-dom";
import CreateGoalForm from "./forms/CreateGoalForm.tsx";
import UpdateGoalForm from "./forms/UpdateGoalForm.tsx";
import DeleteMonthlyGoalForm from "./forms/DeleteMonthlyGoalForm.tsx";
import LatestMonthlyGoal from "./monthlyGoals/LatestMonthlyGoal.tsx";
import MonthyGoalShowCase from "./monthlyGoals/MonthyGoalShowCase.tsx";
import type {MonthlyGoal} from "../../types/GoalType.ts";

export default function DisplayGoals(){

    const [isCreating,setIsCreating] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting,setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();
    const {data, isLoading,isError,error} = useQuery({
        queryKey:["allGoals"],
        queryFn:async() => await getAllGoals(),
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                navigate("/Fitness/createFirstGoal");
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

    const handleDeleting = () => {
        if (isDeleting){
            setIsDeleting(false);
        }else{
            setIsDeleting(true);
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
         <div className={"min-h-screen bg-gradient-to-b from-white to-blue-100 p-5"}>
             <CreateGoalForm isCreating={isCreating} createHandler={handleCreating}/>
             <UpdateGoalForm defaultGoalDetails={data[0]} isUpdating={isUpdating} updateHandler={handleUpdating}/>
             <DeleteMonthlyGoalForm goalDetails={data[0]} isDeleting={isDeleting} deleteHandler={handleDeleting}/>
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
                <LatestMonthlyGoal latestGoalDetail={data[0]} handleUpdating={handleUpdating} handleDeleting={handleDeleting}/>
                 <div>
                     <p className={"mt-5 text-xl border-b-2 border-slate-800"}>Previously set goals</p>
                 </div>
                 <div className={"flex justify-center flex-col mt-5"}>
                     {
                         data.map((monthlyGoal:MonthlyGoal,index:number)=> {
                             if (index === 3){
                                 index++
                             }else{
                                 return(
                                     <div className={"mb-5"}>
                                         <MonthyGoalShowCase latestGoalDetail={monthlyGoal} handleDeleting={handleDeleting}/>
                                     </div>
                                 )
                             }
                         })
                     }
                 </div>
             </div>
         </div>
       );
   }
}