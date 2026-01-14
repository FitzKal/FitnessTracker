import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import {getDailyGoalById} from "../../../services/DailyGoalService.ts";
import type {ExercisesDone} from "../../../types/GoalType.ts";

export default function ExtendedDailyGoal(){
    const {params} = useParams();
    const [isDeleting,setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();
    const goalId = params !== undefined ? String(params) : undefined;

    const {data, isLoading} = useQuery({
        queryKey:["dailyGoalById", goalId],
        queryFn:async () => await getDailyGoalById(goalId),
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                navigate("/Fitness/goals/dailyGoals");
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
        return(
            <div className={"min-h-screen bg-gradient-to-b from-white to-blue-100"}>
                <div>
                    <h1 className={"text-center text-2xl lg:text-4xl"}>Daily Goal</h1>
                    <h2 className={"text-center text-xl mt-2 lg:text-2xl"}>{data.dateOfExercise}</h2>
                </div>
                <div className={"mx-20 border-2 border-slate-200 bg-white mt-5 p-5"}>
                    <div className={"grid grid-cols-2 mb-3 justify-items-center"}>
                        <span>Name of the exercise</span>
                        <span>Number of completion</span>
                    </div>
                        {data.exercisesDone.map((exercise:ExercisesDone) => {
                            return(
                              <div className={"grid grid-cols-2 justify-items-center"}>
                                  <div className={"grid grid-cols-1 my-2"}>
                                      <Link to={`/Fitness/workouts/${exercise.exerciseId}`} className={"hover:text-blue-700 mb-1"}>{exercise.exerciseName}</Link>
                                      <button className={"bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}>
                                          Delete from exercise
                                      </button>
                                  </div>
                                  <span>{exercise.numberOfCompletion}</span>
                              </div>
                            );
                        })}
                    <div className={"flex justify-center mt-5"}>
                        <button className={"px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}
                                onClick={deleteHandler}>
                            Delete goal
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}