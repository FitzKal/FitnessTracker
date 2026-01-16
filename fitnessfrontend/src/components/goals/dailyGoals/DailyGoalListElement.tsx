import type {dailyGoal, ExerciseDone} from "../../../types/GoalType.ts";
import {Link} from "react-router-dom";
import {useState} from "react";
import DeleteDailyGoalForm from "../forms/DeleteDailyGoalForm.tsx";

export default function DailyGoalListElement(prop:{dailyGoal:dailyGoal}){
    const [isDeleting,setIsDeleting] = useState<boolean>(false);
    const displayedExercises = prop.dailyGoal.exercisesDone.slice(0, 3);
    const remainingCount = prop.dailyGoal.exercisesDone.length - 3;

    const deleteHandler = () => {
        setIsDeleting(!isDeleting);
    }

    return (
        <div>
            <div className={"border-2 border-slate-200 p-5 shadow-md bg-white dark:bg-surface dark:border-surface-border h-[300px] flex flex-col justify-between mb-5"}>
                <DeleteDailyGoalForm goalDetails={prop.dailyGoal} isDeleting={isDeleting} deleteHandler={deleteHandler}/>
                <div>
                    <div className={"text-center"}>
                        <Link to={`/Fitness/goals/dailyGoals/${prop.dailyGoal.id}`} className={"text-xl lg:text-2xl hover:text-blue-700"}>
                            {prop.dailyGoal.dateOfExercise.toString()}
                        </Link>
                    </div>
                    <div>
                        <p className={"mt-3 text-center lg:text-left"}>Exercises done: {prop.dailyGoal.exercisesDone.length}</p>
                    </div>
                    <div className={"mt-2 text-center lg:text-left"}>
                        <ul className={"lg:ml-10 list-decimal"}>
                            {displayedExercises.map((exercise:ExerciseDone) => {
                                return(
                                    <li key={exercise.exerciseId} className="truncate pr-2">
                                        <Link to={`/Fitness/workouts/${exercise.exerciseId}`}
                                              className={"hover:text-blue-700"}>{exercise.exerciseName}</Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {remainingCount > 0 && (
                            <p className="lg:ml-10 text-sm text-gray-500 mt-1 italic">
                                ...and {remainingCount} more
                            </p>
                        )}
                    </div>
                </div>

                <div className={"mt-2 flex justify-center"}>
                    <button
                        className={`px-6 py-2 text-white font-semibold rounded-2xl shadow-md transition-colors w-full lg:w-auto bg-red-500 hover:bg-red-600`}
                        onClick={deleteHandler}>
                            Delete goal
                    </button>
                </div>
            </div>
        </div>
    );
}