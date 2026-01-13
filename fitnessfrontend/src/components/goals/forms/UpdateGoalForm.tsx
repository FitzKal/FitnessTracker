import {useForm} from "react-hook-form";
import { type MonthlyGoal,
    updateGoalRequestSchema,
    type updateGoalRequestType
} from "../../../types/GoalType.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMonthlyGoal} from "../../../services/GoalService.ts";
import {toast} from "react-toastify";
import type {AxiosError} from "axios";
import type ApiResponseError from "../../../types/ApiResponseError.ts";

export default function UpdateGoalForm(prop:{defaultGoalDetails:MonthlyGoal,isUpdating:boolean, updateHandler:()=>void}){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<updateGoalRequestType>({
        resolver:zodResolver(updateGoalRequestSchema),
        defaultValues:{
            newEndDate: prop.defaultGoalDetails.finishDate,
            exerciseTypeCalc: prop.defaultGoalDetails.exerciseType,
            newCurrentWeight: prop.defaultGoalDetails.currentWeight,
            newGoalWeight: prop.defaultGoalDetails.goalWeight,
            monthlyGoalId: prop.defaultGoalDetails.monthlyGoalId
        }
    })
    const queryClient = useQueryClient();

    const updateGoalMutation = useMutation({
        mutationFn:(newDetails:updateGoalRequestType) =>{
            return updateMonthlyGoal(newDetails)
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["allGoals"],exact: false});
            toast.success("The goal was successfully updated!");
            prop.updateHandler();
        },
        onError:(error) => {
            if (error instanceof Error){
                const error2 = error as AxiosError<ApiResponseError>;
                console.log(error2.response);
                toast.error(error2.response?.data.message);
            }else {
                console.log(error);
                toast.error("Something went wrong")
            }
        }
    })

    const onSubmit = (goalData:updateGoalRequestType) =>{
        updateGoalMutation.mutate(goalData);
    }

    return(
        <>
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
                    prop.isUpdating ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={prop.updateHandler}
                aria-hidden={!prop.isUpdating}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Update Profile Details"
                className={`
            fixed z-50
            left-1/2 -translate-x-1/2
            top-4 sm:top-10
            w-[95%] sm:w-auto
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            bg-white border-2 rounded-2xl p-5 sm:p-8
            text-center
            transition-all duration-500 ease-out
            ${prop.isUpdating
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}
            >
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Update Monthly Goal
                </h1>

                <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 justify-items-center">

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold ml-1 mb-1">
                                New Goal Weight
                            </label>
                            <input
                                {...register("newGoalWeight", { valueAsNumber: true })}
                                type="number"
                                placeholder="70 kg"
                                required
                                className="p-2 border-2 rounded-lg focus:border-orange-400 outline-none"
                            />
                            <div className="absolute top-full left-0 text-red-500 text-xs mt-1 h-4">
                                {errors.newGoalWeight?.message}
                            </div>
                        </div>

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold ml-1 mb-1">
                                New Current Weight
                            </label>
                            <input
                                {...register("newCurrentWeight", { valueAsNumber: true })}
                                type="number"
                                placeholder="70 kg"
                                required
                                className="p-2 border-2 rounded-lg focus:border-orange-400 outline-none"
                            />
                            <div className="absolute top-full left-0 text-red-500 text-xs mt-1 h-4">
                                {errors.newCurrentWeight?.message}
                            </div>
                        </div>

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold ml-1 mb-1">
                                New Exercise Type
                            </label>
                            <select
                                {...register("exerciseTypeCalc")}
                                className="bg-white border-2 h-10 rounded-lg px-2"
                            >
                                <option value="SEDENTARY">Sedentary</option>
                                <option value="LIGHT">Light</option>
                                <option value="MODERATE">Moderate</option>
                                <option value="ACTIVE">Active</option>
                                <option value="VERY_ACTIVE">Very Active</option>
                                <option value="EXTRA_ACTIVE">Extra Active</option>
                            </select>
                        </div>

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold ml-1 mb-1">
                                New End Date
                            </label>
                            <input
                                type="date"
                                {...register("newEndDate", { valueAsDate: true })}
                                className="p-2 border-2 rounded-lg focus:border-orange-400 outline-none"
                            />
                            <div className="absolute top-full left-0 text-red-500 text-xs mt-1 h-4">
                                {errors.newEndDate?.message}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition-colors"
                            onClick={prop.updateHandler}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-lg"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}