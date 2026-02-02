import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getWorkoutById} from "../../services/WorkoutService.ts";
import {useEffect, useState} from "react";
import type {WorkoutById} from "../../types/WorkoutType.ts";
import type {ExerciseDone} from "../../types/GoalType.ts";
import {addExerciseToGoal, useLatestGoalDetails} from "../../services/GoalService.ts";
import {toast} from "react-toastify";

export default function WorkoutPage() {
    const {params} = useParams();
    const {isError:isGoalError, isLoading:isGoalLoading} = useLatestGoalDetails();
    const excId = params !== undefined ? String(params) : undefined;
    const [workoutData, setWorkoutData] = useState<WorkoutById>();
    const exerciseDetails:ExerciseDone = {
        exerciseId:workoutData?.exerciseId,
        exerciseName:workoutData?.name
    }

    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ["workoutById", excId],
        queryFn: async () => {
            return await getWorkoutById(excId);
        }
    })

    const addExerciseMutation = useMutation({
        mutationFn:(details:ExerciseDone)=>addExerciseToGoal(details),
        onSuccess:(result) => {
            toast.success(result)
        },
        onError:(error) => {
            if (error instanceof Error){
                console.log(error);
                toast.error(error.message);
            }
            else {
                console.log(error)
            }
        }
    })

    useEffect(() => {
        setWorkoutData(data);

    }, [isSuccess, data, workoutData]);

    if (isLoading || isGoalLoading) {
        return (<div className={"text-center text-4xl"}>Loading...</div>)
    } else {

        return (<div className={"flex justify-center mb-2"}>
            <div className={"flex flex-col"}>
                <div className={"text-center bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-sm w-full py-2"}>
                    <h1 className={"text-4xl"}>{workoutData?.name}</h1>
                </div>
                <div className={"grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-2 mx-20 mt-5"}>
                    <div className={"bg-slate-100 relative border rounded-l shadow-2xl md:shrink-0"}>
                        <img className="w-full h-full object-cover"
                             src={workoutData?.imageUrls["720p"]} alt={workoutData?.name}/>
                    </div>
                    <div className={"flex flex-col gap-y-5"}>
                        <div className="relative border-2 border-black dark:bg-surface dark:border-surface-border p-6 rounded-md mx-3 ">
                    <span className="absolute -top-3 left-4 bg-slate-100 dark:bg-blue-900 px-3 rounded-full text-sm font-semibold">
                                Equipment needed
                              </span>
                            <ul className={"flex flex-row flex-wrap gap-2"}>
                                {workoutData?.equipments.map((equipment, index) => {
                                    return <li key={index} className={"bg-blue-200 dark:bg-blue-600 rounded-2xl px-2"}>{equipment}</li>
                                })}
                            </ul>
                        </div>
                        <div>
                            <div className="relative border-2 border-black dark:bg-surface dark:border-surface-border p-6 rounded-md mx-3 ">
                    <span className="absolute -top-3 left-4 bg-slate-100 dark:bg-blue-900 px-3 rounded-full text-sm font-semibold">
                                BodyParts trained
                              </span>
                                <ul className={"flex flex-row flex-wrap gap-2"}>
                                    {workoutData?.bodyParts.map((bodyParts, index) => {
                                        return <li className={"bg-yellow-200 dark:bg-yellow-700 rounded-2xl px-2"}
                                                   key={index}>{bodyParts}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="relative border-2 border-black dark:bg-surface dark:border-surface-border p-6 rounded-md mx-3 ">
                    <span className="absolute -top-3 left-4 bg-slate-100 dark:bg-blue-900 px-3 rounded-full text-sm font-semibold">
                                Targeted Muscles/Muscle Groups
                              </span>
                            <ul className={"flex flex-row flex-wrap gap-2"}>
                                {workoutData?.targetMuscles.map((targetMuscles, index) => {
                                    return <li className={"bg-red-200 dark:bg-red-500 rounded-2xl px-2"}
                                               key={index}>{targetMuscles}</li>
                                })}
                            </ul>
                        </div>
                        <div className="relative border-2 border-black p-6 dark:bg-surface dark:border-surface-border rounded-md mx-3 ">
                    <span className="absolute -top-3 left-4 bg-slate-100 dark:bg-blue-900 px-3 rounded-full text-sm font-semibold">
                                Targeted Secondary Muscles/Muscle Groups
                              </span>
                            <ul className={"flex flex-row flex-wrap gap-2"}>
                                {workoutData?.secondaryMuscles.map((targetMuscles, index) => {
                                    return <li key={index}
                                               className={"bg-slate-200 dark:bg-slate-700 rounded-2xl px-2"}>{targetMuscles}</li>
                                })}
                            </ul>
                        </div>
                        <div className="relative border-2 border-black dark:bg-surface dark:border-surface-border p-6 rounded-md mx-3 ">
                    <span className="absolute -top-3 left-4 bg-slate-100 dark:bg-blue-900 px-3 rounded-full text-sm font-semibold">
                                Variations
                              </span>
                            {workoutData?.variations.map((variations, index) => {
                                return <p key={index}>{variations}</p>
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="relative border-2  dark:bg-surface dark:border-surface-border border-black p-6 rounded-md mx-20 my-5 ">
                    <span className="absolute -top-3 left-4 bg-slate-100 dark:bg-blue-900 px-3 rounded-full text-sm font-semibold">
                                Instructions
                              </span>
                        {workoutData?.instructions.map((instructions, index) => {
                            return <p key={index}>{instructions}</p>
                        })}
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"text-center"}>
                        <h2 className={"text-xl mb-2"}>Video for presentation</h2>
                        <div className={"border rounded-md md:shrink-0 lg:shrink-0"}>
                            <video  src={workoutData?.videoUrl} autoPlay={false} controls>
                            </video>
                        </div>
                    </div>
                </div>
                {
                    !isGoalError?
                        <div className={"flex justify-center mt-5"}>
                            <div className={"flex justify-center mt-5"}>
                                <button  className="
                        px-6 py-2 rounded-xl
                        bg-green-500 hover:bg-green-600
                        dark:bg-green-700 dark:hover:bg-green-900
                        text-white font-bold
                        transition-colors shadow-lg
                    "
                                         onClick={() =>{
                                             addExerciseMutation.mutate(exerciseDetails)
                                         }}   >I have done this workout today!</button>
                            </div>
                        </div>:
                            <></>
                }
            </div>
        </div>);
    }
}