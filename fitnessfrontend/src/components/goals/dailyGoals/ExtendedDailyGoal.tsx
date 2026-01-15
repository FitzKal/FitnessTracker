import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { getDailyGoalById } from "../../../services/DailyGoalService.ts";
import type { ExercisesDone } from "../../../types/GoalType.ts";

// Simple SVG Icons components to keep code clean
const TrashIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export default function ExtendedDailyGoal() {
    const { params } = useParams();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();
    const goalId = params !== undefined ? String(params) : undefined;

    const { data, isLoading } = useQuery({
        queryKey: ["dailyGoalById", goalId],
        queryFn: async () => await getDailyGoalById(goalId),
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                navigate("/Fitness/goals/dailyGoals");
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        },
    });

    const deleteHandler = () => {
        setIsDeleting(!isDeleting);
    };

    useEffect(() => {
        if (!isLoading) {
            console.log(data);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-pulse text-xl text-blue-600 font-medium">Loading Goal...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Daily Goal</h1>
                            <p className="text-blue-600 font-medium mt-1 text-lg">{data.dateOfExercise}</p>
                        </div>
                        <div className="flex space-x-3 text-sm font-medium">
                            <Link to={`/Fitness/goals/weeklyGoals/${data.parentWeekId}`} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                                Week
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link to={`/Fitness/goals/monthlyGoals/${data.parentMonthId}`} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                                Month
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-4 mt-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700">Exercises Completed</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {data.exercisesDone.length} Total
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {data.exercisesDone.map((exercise: ExercisesDone) => (
                            <div key={exercise.exerciseId} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                    <Link
                                        to={`/Fitness/workouts/${exercise.exerciseId}`}
                                        className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors block"
                                    >
                                        {exercise.exerciseName}
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Completed: <span className="font-semibold text-gray-700">{exercise.numberOfCompletion}</span>
                                    </p>
                                </div>

                                <div className="mt-3 sm:mt-0 pl-0 sm:pl-4">
                                    <button
                                        className="flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sm:hidden ml-2">Remove</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {data.exercisesDone.length === 0 && (
                            <div className="p-8 text-center text-gray-500 italic">
                                No exercises recorded for this day yet.
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    {isDeleting ? (
                        <div className="flex flex-col items-center bg-red-50 border border-red-100 p-4 rounded-xl w-full sm:w-auto">
                            <p className="text-red-800 font-medium mb-3">Are you sure you want to delete this daily goal?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={deleteHandler}
                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setIsDeleting(false)}
                                    className="px-6 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-semibold rounded-lg shadow-sm transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={deleteHandler}
                            className="flex items-center px-6 py-3 text-red-600 bg-white border border-red-200 hover:bg-red-50 hover:border-red-300 font-semibold rounded-xl shadow-sm transition-all"
                        >
                            <TrashIcon className="w-5 h-5 mr-2" />
                            Delete Entire Goal
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}