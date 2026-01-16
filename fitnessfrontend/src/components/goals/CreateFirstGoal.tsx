import {useProfileDetails} from "../../services/UserProfileService.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {createGoalRequestSchema, type createGoalRequestType} from "../../types/GoalType.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {postMonthlyGoal} from "../../services/GoalService.ts";

export default function CreateFirstGoal(){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<createGoalRequestType>({
        resolver:zodResolver(createGoalRequestSchema),
    })
    const [isCreating,setIsCreating] = useState<boolean>(false);
    const{isError:isProfileError, error:profileError} = useProfileDetails();
    const navigate =useNavigate();
    useEffect(() => {
        if (isProfileError&&axios.isAxiosError(profileError) && profileError.response?.status === 404) {
            toast.error("Please create a profile before creating a goal!");
            navigate("/Fitness/createProfile");
        }

    }, [isProfileError, navigate, profileError]);

    const createGoalMutation = useMutation({
        mutationFn:(goalData:createGoalRequestType)=> postMonthlyGoal(goalData),
        onSuccess:() => {
            toast.success("First goal successfully created!");
            navigate("/Fitness/goals/monthlyGoals");
        },onError:(error) =>{
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message);
            }else {
                toast.error("Something went wrong");
                console.log((error as Error).message);
            }
        }
    })

    const onSubmit = (goalData:createGoalRequestType) => {
        createGoalMutation.mutate(goalData);
    }

    if (!isCreating){
        return (
            <div className={"min-h-screen bg-gradient-to-b from-white to-blue-100"}>
                <div className={"mt-10"}>
                    <h1 className="text-2xl lg:text-4xl text-center mb-6">
                        You have not set a fitness goal yet!
                    </h1>
                    <div className="flex justify-center">
                        <button
                            className="
                                text-xl sm:text-2xl
                                px-6 sm:px-8 py-3
                                bg-green-500 hover:bg-green-600
                                text-white font-semibold
                                rounded-2xl shadow-lg
                                transition-all duration-300
                                transform hover:-translate-y-1 hover:scale-105
                                focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                                         "
                            onClick={() => setIsCreating(true)}
                        >
                            Create a goal!
                        </button>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className={"min-h-screen bg-gradient-to-b from-white to-blue-100"}>
                <div className={"flex justify-center"}>
                    <div className={"border-2 p-5 bg-white shadow-md border-slate-200 lg:translate-y-1/2"}>
                        <h1 className={"text-center lg:text-4xl md:2xl"}>Create your first Fitness goal!</h1>
                        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div
                                className="
                    grid lg:grid-cols-2
                    sm:grid-cols-1
                    md:grid-cols-1
                    gap-x-10 gap-y-6
                    justify-items-center
                "
                            >

                                <div className="flex flex-col text-left relative w-full max-w-xs">
                                    <label className="text-sm font-semibold ml-1 mb-1">
                                        Goal Weight
                                    </label>
                                    <input
                                        {...register("goalWeight", { valueAsNumber: true })}
                                        placeholder="70 kg"
                                        required
                                        className="p-2 border-2 rounded-lg focus:border-orange-400 outline-none bg-white"
                                        type={"number"}
                                    />
                                    {errors.goalWeight && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.goalWeight.message}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col text-left relative w-full max-w-xs">
                                    <label className="text-sm font-semibold ml-1 mb-1">
                                        Exercise Type
                                    </label>
                                    <select
                                        {...register("exerciseType")}
                                        className="bg-white border-2 h-10 rounded-lg px-2"
                                    >
                                        <option value={"SEDENTARY"}>Sedentary: Little to no exercise</option>
                                        <option value={"LIGHT"}>Light: Exercise 1-3 times a week</option>
                                        <option value={"MODERATE"}>Moderate: Exercise 4-5 times a week</option>
                                        <option value={"ACTIVE"}>Active: Daily exercise, or intense exercise at least 3 times a week</option>
                                        <option value={"VERY_ACTIVE"}>Very Active: Intense exercise 6-7 times a week</option>
                                        <option value={"EXTRA_ACTIVE"}>Extra Active: Intense exercise daily or physical job</option>
                                    </select>
                                </div>

                                <div className="flex flex-col text-left relative w-full max-w-xs lg:translate-1/2 lg:translate-x-1/2">
                                    <label className="text-sm font-semibold ml-1 mb-1">
                                        End date
                                    </label>
                                    <input
                                        type="date"
                                        {...register("endDate", { valueAsDate: true })}
                                        className="p-2 border-2 rounded-lg focus:border-orange-400 outline-none bg-white"
                                    />
                                    {errors.endDate && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.endDate.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div
                                className="
                    mt-10
                    flex flex-col sm:flex-row
                    justify-center
                    gap-4 sm:gap-6
                "
                            >

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="
                        px-6 py-2 rounded-xl
                        bg-green-500 hover:bg-green-600
                        text-white font-bold
                        transition-colors shadow-lg
                    "
                                >
                                    {isSubmitting ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}