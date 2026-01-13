import {Link} from "react-router-dom";
import {getCurrentDateYYYYMMDD} from "../../../services/GoalService.ts";
import DateProgressBar from "../DateProgressBar.tsx";
import type {MonthlyGoal} from "../../../types/GoalType.ts";

export default function LatestMonthlyGoal(prop:{latestGoalDetail:MonthlyGoal, handleUpdating:() => void, handleDeleting:() => void}){
    return(
        <div>
            <div className="relative border-2 border-black p-6 rounded-md bg-white shadow-md">
                <Link to={`/Fitness/goals/monthlyGoals/${prop.latestGoalDetail.monthlyGoalId}`}
                      className="absolute -top-3 left-4 bg-red-100 px-3 rounded-full text-sm font-semibold hover:text-blue-700">
                    Your current Monthly goal
                </Link>
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
                <div className={"grid lg:grid-cols-3 justify-items-center sm:grid-cols-1 mt-5 sm: gap-y-2"}>
                    <Link to={"/Fitness/workouts"} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-2xl shadow-md transition-colors">Add new weekly goal</Link>
                    <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                            onClick={prop.handleUpdating} >Edit Goal</button>
                    <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"
                            onClick={prop.handleDeleting}>Delete Goal</button>
                </div>
                <div className={"mt-5"}>
                    <Link to={`/Fitness/goals/monthlyGoals/${prop.latestGoalDetail.monthlyGoalId}`}
                          className={"hover:text-blue-700"}>To check out your detailed progress statistics for ths goal click here, or the goal name!</Link>
                </div>
            </div>
        </div>
    )
}