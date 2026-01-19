import {Link} from "react-router-dom";
import DateProgressBar from "../goals/DateProgressBar.tsx";
import GoalProgressBar from "../goals/GoalProgressBar.tsx";
import type {MonthlyGoal} from "../../types/GoalType.ts";

export default function DisplayLatestProfileGoal(prop:{latestGoalData:MonthlyGoal}){
    if (prop.latestGoalData){
        return (
            <div>
                <div className={"flex justify-center"}>
                    <Link to={`/Fitness/goals/monthlyGoals/${prop.latestGoalData.monthlyGoalId}`}
                          className={"hover:text-blue-700 text-xl"}>Your Latest Goal</Link>
                </div>
                <div className={"flex flex-col justify-center"}>
                    <div className={"flex justify-between mt-3"}>
                        <span>Start date: {prop.latestGoalData.startDate.toString()}</span>
                        <span>Finish date: {prop.latestGoalData.finishDate.toString()}</span>
                    </div>
                    <DateProgressBar startDate={prop.latestGoalData.startDate} endDate={prop.latestGoalData.finishDate}/>
                </div>
                <div className={"flex justify-between mt-5"}>
                    <span>Start weight: {prop.latestGoalData.currentWeight}</span>
                    <span>Goal Weight: {prop.latestGoalData.goalWeight}</span>
                </div>
                <GoalProgressBar currentWeight={prop.latestGoalData.currentWeight} goalWeight={prop.latestGoalData.goalWeight}/>
                <div className={"flex justify-between gap-2 mt-5"}>
                    <p>Exercises remaining: {prop.latestGoalData.exercisesRemaining}</p>
                    <p>Days exercised: {prop.latestGoalData.exercisesDone}</p>
                </div>
                <div className={"grid grid-cols-1 justify-items-center mt-5 gap-y-5"}>
                    <p>Weeks recorded: {prop.latestGoalData.weeklyGoals.length}</p>
                    <p>Chosen exercise type: {prop.latestGoalData.exerciseType}</p>
                </div>
            </div>
        );
    }else {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-semibold text-blue-800">Loading Profile...</h1>
            </div>
        );
    }
}