import DateProgressBar from "../goals/DateProgressBar.tsx";
import GoalProgressBar from "../goals/GoalProgressBar.tsx";
import type {MonthlyGoal} from "../../types/GoalType.ts";
import {Link} from "react-router-dom";

export default function LatestGoalDisplay(prop:{latestGoal:MonthlyGoal}){
   if (!prop.latestGoal){
       return <div>
           <h1 className={"text-center text-4xl"}>Loading...</h1>
       </div>
   }
    return (
        <div>
            <div className={"flex justify-center"}>
                <Link to={`/Fitness/goals/monthlyGoals/${prop.latestGoal?.monthlyGoalId}`}
                      className={"text-xl lg:text-2xl mb-2 lg:mb-0 hover:text-blue-700"}>Check out your progress on your latest goal!</Link>
            </div>
            <div className={"flex flex-col justify-center"}>
                <div className={"flex justify-between mt-3"}>
                    <span>Start date: {prop.latestGoal.startDate.toString()}</span>
                    <span>Finish date: {prop.latestGoal.finishDate.toString()}</span>
                </div>
                <DateProgressBar startDate={prop.latestGoal.startDate} endDate={prop.latestGoal.finishDate}/>
            </div>
            <div className={"flex justify-between mt-5"}>
                <span>Start weight: {prop.latestGoal.currentWeight}</span>
                <span>Goal Weight: {prop.latestGoal.goalWeight}</span>
            </div>
            <GoalProgressBar currentWeight={prop.latestGoal.currentWeight} goalWeight={prop.latestGoal.goalWeight}/>
        </div>
    )
}