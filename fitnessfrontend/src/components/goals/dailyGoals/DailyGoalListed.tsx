import type {dailyGoal, ExerciseDone} from "../../../types/GoalType.ts";
import {Link} from "react-router-dom";

export default function DailyGoalListed(prop:{dailyGoal:dailyGoal}){
    const displayedExercises = prop.dailyGoal.exercisesDone.slice(0, 3);
    const remainingCount = prop.dailyGoal.exercisesDone.length - 3;

    return (
        <div>
            <div className={"border-2 border-slate-200 bg-white dark:border-surface-border dark:bg-surface p-5 h-[250px] flex flex-col"}>

                <div className={"flex justify-center text-lg mb-2"}>
                    <Link to={`/Fitness/goals/dailyGoals/${prop.dailyGoal.id}`} className={"hover:text-blue-700 font-semibold"}>
                        {prop.dailyGoal.dateOfExercise.toString()}
                    </Link>
                </div>

                <div className="flex-1">
                    <div>
                        <p className={"text-center lg:text-left text-sm text-gray-600 dark:text-white"}>
                            Number of exercises done: {prop.dailyGoal.exercisesDone.length}
                        </p>
                        <p className={"text-center lg:text-left mt-2 font-medium"}>Exercises Done:</p>
                    </div>

                    <div className={"mt-1 text-center lg:text-left"}>
                        <ul className={"lg:ml-10 list-decimal"}>
                            {displayedExercises.map((exercise:ExerciseDone) => {
                                return(
                                    <li key={exercise.exerciseId} className="truncate pr-2">
                                        <Link to={`/Fitness/workouts/${exercise.exerciseId}`}
                                              className={"hover:text-blue-700"}>
                                            {exercise.exerciseName}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {remainingCount > 0 && (
                            <p className="lg:ml-10 text-xs text-gray-500 mt-1 italic">
                                ...and {remainingCount} more
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}