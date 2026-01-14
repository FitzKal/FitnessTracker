import type {dailyGoal} from "../../../types/GoalType.ts";
import {Link} from "react-router-dom";

export default function DailyGoalShowcase(prop:{dailyGoal:dailyGoal}){
    return (
        <div>
            <Link to={`/Fitness/goals/dailyGoals/${prop.dailyGoal.id}`} className={"hover:text-blue-700"}>Day: {prop.dailyGoal.dateOfExercise.toString()}</Link>
            <p>Exercises done: {prop.dailyGoal.exercisesDone.length}</p>
        </div>
    );
}