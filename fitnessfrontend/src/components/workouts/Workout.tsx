import React from 'react';
import type { WorkoutListElement } from "../../types/WorkoutType.ts";
import {Link} from "react-router-dom";
export default function Workout(prop: { workoutDetails: WorkoutListElement }) {
    const { workoutDetails } = prop;

    if (!workoutDetails) return null;

    const Label = ({ children }: { children: React.ReactNode }) => (
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
            {children}
        </p>
    );

    const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => (
        <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${color}`}>
            {children}
        </span>
    );

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

                <div className="p-6 flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 content-start">

                    <div className="lg:col-span-1">
                        <Label>Workout Name</Label>
                        <Link to={`/Fitness/workouts/${workoutDetails.exerciseId}`}
                              className="text-xl font-black text-slate-800 leading-tight transition delay-25 ease-in-out hover:text-blue-600">
                            {workoutDetails.name}
                        </Link>
                    </div>

                    <div>
                        <Label>Body Part</Label>
                        <div className="flex flex-wrap gap-1">
                            {workoutDetails.bodyParts.map((part, index) => (
                                <Badge key={index} color="bg-slate-50 text-slate-600 border-slate-200">
                                    {part}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>Equipment</Label>
                        <div className="flex flex-wrap gap-1">
                            {workoutDetails.equipments.map((item, index) => (
                                <Badge key={index} color="bg-amber-50 text-amber-700 border-amber-100">
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>Primary Targets</Label>
                        <div className="flex flex-wrap gap-1">
                            {workoutDetails.targetMuscles.map((muscle, index) => (
                                <Badge key={index} color="bg-emerald-50 text-emerald-700 border-emerald-100">
                                    {muscle}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-4 pt-4 border-t border-slate-100 mt-2">
                        <Label>Secondary Muscles</Label>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {workoutDetails.secondaryMuscles.map((muscle, index) => (
                                <span key={index} className="text-sm text-slate-500 flex items-center">
                                    <span className="w-1 h-1 rounded-full bg-slate-300 mr-2" />
                                    {muscle}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}