import type {dailyGoal} from "../../types/GoalType.ts";

export default function DailyGoalShowcase(prop:{dailyGoal:dailyGoal}){
    return (
        <div>
            <p className={"hover:text-blue-700"}>Day: {prop.dailyGoal.dateOfExercise.toString()}</p>
            <p>Exercises done: {prop.dailyGoal.exercisesDone.length}</p>
        </div>
    );
}