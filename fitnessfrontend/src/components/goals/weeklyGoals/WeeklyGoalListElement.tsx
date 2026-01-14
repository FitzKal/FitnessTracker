import type {weeklyGoal} from "../../../types/GoalType.ts";
import {Link} from "react-router-dom";
import DateProgressBar from "../DateProgressBar.tsx";

export default function WeeklyGoalListElement(prop:{weeklyGoal:weeklyGoal}){
    return(
        <div>
            <fieldset className={"border-2 p-6 shadow-md bg-white"}>
                <legend className={"ml-4 px-2 bg-red-200 rounded-md hover:text-blue-700 hover:bg-red-300"}>
                <Link to={"/"}>{prop.weeklyGoal.startOfTheWeek.toString()} to {prop.weeklyGoal.endOfTheWeek.toString()}</Link>
                </legend>
                <div>
                    <div className={"hidden lg:flex lg:justify-between"}>
                        <p>{prop.weeklyGoal.startOfTheWeek.toString()}</p>
                        <p>{prop.weeklyGoal.endOfTheWeek.toString()}</p>
                    </div>
                    <DateProgressBar startDate={prop.weeklyGoal.startOfTheWeek} endDate={prop.weeklyGoal.endOfTheWeek}/>
                </div>
                <div
                    className={"grid grid-cols-1 text-center mt-2 lg:grid-cols-2 lg:gap-5 sm:justify-items-center lg:text-left"}>
                    <span>Days to exercise remaining: {prop.weeklyGoal.exercisesRemaining}</span>
                    <span>Days exercised: {prop.weeklyGoal.dailyGoals.length} </span>
                </div>
                <div className={"mt-2 flex justify-center"}>
                    <button className={"px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}>
                        Delete goal
                    </button>
                </div>
            </fieldset>
        </div>
    )
}