import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createGoalRequestSchema, type createGoalRequestType} from "../../../types/GoalType.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postMonthlyGoal} from "../../../services/GoalService.ts";
import {toast} from "react-toastify";
import type {AxiosError} from "axios";
import type ApiResponseError from "../../../types/ApiResponseError.ts";


export default function CreateGoalForm(prop:{isCreating:boolean, createHandler:()=>void}){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<createGoalRequestType>({
       resolver:zodResolver(createGoalRequestSchema),
    })
    const queryClient = useQueryClient();

    const createGoalMutation = useMutation({
        mutationFn: (data:createGoalRequestType) => postMonthlyGoal(data),
        onSuccess:(result) => {
            queryClient.invalidateQueries({queryKey:["allGoals"],exact: false});
            toast.success("The goal was successfully created!");
            console.log(result)
            prop.createHandler();
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

    const onSubmit = (data:createGoalRequestType) => {
        createGoalMutation.mutate(data);
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
                    prop.isCreating ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={prop.createHandler}
                aria-hidden={!prop.isCreating}
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
            dark:border-surface-border dark:bg-surface
            text-center
            transition-all duration-500 ease-out
            ${prop.isCreating
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}
            >
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Create Goal
                </h1>

                <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div
                        className="
                    grid grid-cols-1
                    sm:grid-cols-2
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
                                className="p-2 border-2 rounded-lg focus:border-orange-400 outline-none bg-white text-black"
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
                                className="bg-white border-2 h-10 rounded-lg px-2 text-black"
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
                                End date
                            </label>
                            <input
                                type="date"
                                {...register("endDate", { valueAsDate: true })}
                                className="p-2 border-2 rounded-lg focus:border-orange-400 outline-none bg-white text-black"
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
                            type="button"
                            className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 font-semibold transition-colors"
                            onClick={prop.createHandler}
                        >
                            Cancel
                        </button>

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
        </>
    );
}