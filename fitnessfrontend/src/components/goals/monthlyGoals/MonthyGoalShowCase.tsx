import {Link} from "react-router-dom";
import {getCurrentDateYYYYMMDD} from "../../../services/GoalService.ts";
import DateProgressBar from "../DateProgressBar.tsx";
import type {MonthlyGoal} from "../../../types/GoalType.ts";

export default function MonthlyGoalShowCase(prop:{latestGoalDetail:MonthlyGoal, handleDeleting:() => void}){
    return(
        <div>
            <fieldset className="border-2 border-black p-6 dark:bg-surface dark:border-surface-border rounded-md bg-white shadow-md">
                <legend className="px-2 ml-4">
                    <Link
                        to={`/Fitness/goals/monthlyGoals/previous/${prop.latestGoalDetail.monthlyGoalId}`}
                        className="bg-red-100 dark:bg-red-600 px-3 py-1 rounded-full text-sm font-semibold hover:text-blue-700"
                    >
                        Monthly goal
                    </Link>
                </legend>

                <div className="flex flex-col text-center lg:flex-row lg:justify-between">
                    <p>Start date: {prop.latestGoalDetail.startDate.toString()}</p>
                    <p>Current date: {getCurrentDateYYYYMMDD()}</p>
                    <p>Finish date: {prop.latestGoalDetail.finishDate.toString()}</p>
                </div>

                <div>
                    <DateProgressBar startDate={prop.latestGoalDetail.startDate} endDate={prop.latestGoalDetail.finishDate}/>
                </div>

                <div>
                    <p>Remaining days to exercise: {prop.latestGoalDetail.exercisesRemaining}</p>
                    <p>Days exercised: {prop.latestGoalDetail.exercisesDone}</p>
                    <p>Weeks recorded: {prop.latestGoalDetail.weeklyGoals.length}</p>
                    <p>Current exercise style type selected: {prop.latestGoalDetail.exerciseType}</p>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                        onClick={prop.handleDeleting}
                    >
                        Delete Goal
                    </button>
                </div>

                <div className="mt-5 text-left">
                    <Link
                        to={`/Fitness/goals/monthlyGoals/previous/${prop.latestGoalDetail.monthlyGoalId}`}
                        className="hover:text-blue-700"
                    >
                        To check out your detailed progress statistics for this goal click here, or the goal name!
                    </Link>
                </div>
            </fieldset>
        </div>
    )

}