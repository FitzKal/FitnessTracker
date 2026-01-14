import type {dailyGoal, weeklyGoal} from "../../../types/GoalType.ts";
import DateProgressBar from "../DateProgressBar.tsx";
import DailyGoalShowcase from "../dailyGoals/DailyGoalShowcase.tsx";

export default function WeeklyGoalShowcase(prop:{weeklyGoal:weeklyGoal}){
    return(
        <div>
            <div className={"flex justify-between"}>
                <p>Start date: {prop.weeklyGoal.startOfTheWeek.toString()}</p>
                <p>Finish date: {prop.weeklyGoal.endOfTheWeek.toString()}</p>
            </div>
            <div>
                <DateProgressBar startDate={prop.weeklyGoal.startOfTheWeek} endDate={prop.weeklyGoal.endOfTheWeek}/>
            </div>
            <div>
                <p>Remaining days to exercise: {prop.weeklyGoal.exercisesRemaining}</p>
            </div>
            <div className={"mt-2"}>
                <p className={"text-lg text-center lg:text-left"}>Recorded Days exercised: </p>
               <div className={"grid grid-cols-1 justify-items-center mt-3 lg:grid-cols-4 "}>
                   {
                       prop.weeklyGoal.dailyGoals.map((dailyGoal:dailyGoal) => {
                           return(
                               <div className={"mb-4"}>
                                   <DailyGoalShowcase dailyGoal={dailyGoal}/>
                               </div>
                           )
                       })
                   }

               </div>
            </div>
        </div>
    );
}