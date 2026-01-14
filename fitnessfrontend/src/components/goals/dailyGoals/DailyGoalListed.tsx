import type {dailyGoal, ExerciseDone} from "../../../types/GoalType.ts";
import {Link} from "react-router-dom";

export default function DailyGoalListed(prop:{dailyGoal:dailyGoal}){
    return (
        <div>
            <div className={"border-2 border-slate-200 bg-white p-5"}>
                <div className={"flex justify-center text-lg"}>
                    <Link to={`/Fitness/goals/dailyGoals/${prop.dailyGoal.id}`} className={"hover:text-blue-700"}>{prop.dailyGoal.dateOfExercise.toString()}</Link>
                </div>
                <div>
                    <p className={"text-center lg:text-left"}>Number of exercises done: {prop.dailyGoal.exercisesDone.length}</p>
                    <p className={"text-center lg:text-left"}>Exercises Done:</p>
                </div>
                <div className={"mt-2 text-center lg:text-left"}>
                    <ul className={"lg:ml-10 list-decimal"}>
                    {prop.dailyGoal.exercisesDone.map((exercise:ExerciseDone) => {
                        return(
                              <li>
                                  <Link to={`/Fitness/workouts/${exercise.exerciseId}`}
                                  className={"hover:text-blue-700"}>{exercise.exerciseName}</Link>
                              </li>
                        );
                    })}
                    </ul>

                </div>
            </div>

        </div>
    )
}