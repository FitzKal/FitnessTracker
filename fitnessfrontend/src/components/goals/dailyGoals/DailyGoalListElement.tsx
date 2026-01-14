import type {dailyGoal, ExerciseDone} from "../../../types/GoalType.ts";
import {Link} from "react-router-dom";
import {useState} from "react";

export default function DailyGoalListElement(prop:{dailyGoal:dailyGoal}){
    const [isDeleting,setIsDeleting] = useState<boolean>(false);

    const deleteHandler = () => {
        if (isDeleting){
            setIsDeleting(false)
        }else {
            setIsDeleting(true)
        }
    }
    return (
      <div>
          <div className={"border-2 border-slate-200 p-5 shadow-md bg-white"}>
              <div className={"text-center"}>
                  <Link to={`/Fitness/goals/dailyGoals/${prop.dailyGoal.id}`} className={"text-xl lg:text-2xl hover:text-blue-700"}>{prop.dailyGoal.dateOfExercise.toString()}</Link>
              </div>
              <div>
                  <p className={"mt-3 text-center lg:text-left"}>Exercises done: {prop.dailyGoal.exercisesDone.length}</p>
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
              <div className={"mt-2 flex justify-center"}>
                  <button className={"px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}
                          onClick={deleteHandler}>
                      Delete goal
                  </button>
              </div>
          </div>
      </div>
    );
}