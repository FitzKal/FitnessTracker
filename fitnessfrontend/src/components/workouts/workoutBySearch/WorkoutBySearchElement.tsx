import type {WorkoutSearch} from "../../../types/WorkoutType.ts";
import {Link} from "react-router-dom";

export default function WorkoutBySearchElement(prop:{workoutDetails:WorkoutSearch}){
    const { workoutDetails } = prop;

    if (!workoutDetails) return null;

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-stretch">

                <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 bg-slate-100">
                    <img
                        className="w-full h-full object-cover"
                        src={workoutDetails.imageUrl}
                        alt={workoutDetails.name}
                    />
                </div>

                <div className="p-6 flex items-center">
                    <Link
                        to={`/Fitness/workouts/${workoutDetails.exerciseId}`}
                        className="text-xl font-black text-slate-800 leading-tight transition delay-25 ease-in-out hover:text-blue-600"
                    >
                        {workoutDetails.name}
                    </Link>
                </div>

            </div>
        </div>
    );

}