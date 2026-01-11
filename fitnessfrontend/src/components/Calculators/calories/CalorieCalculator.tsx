import CalorieStats from "./CalorieStats.tsx";
import { useState } from "react";
import type { calorieResponse } from "../../../types/CalculatorTypes.ts";
import FetchedCalories from "./FetchedCalories.tsx";
import CalorieCountingInformation from "./CalorieCountingInformation.tsx";
import CustomCalorie from "./CustomCalorie.tsx";

export default function CalorieCalculator() {
    const [calorieIntake, setCalorieIntake] = useState<calorieResponse>();
    const [isOwnCalorieIntake, setOwnCalorieIntake] = useState<boolean>(true);

    const handleCalorieIntakeChange = (intake: calorieResponse) => {
        setCalorieIntake(intake);
    };

    return (
        <div className="bg-gradient-to-b from-white to-blue-300 min-h-screen p-4 sm:p-8">
            {/* Title */}
            <div className="flex justify-center">
                <h1 className="text-3xl sm:text-4xl font-semibold mt-8 text-center">
                    Welcome to the Calorie Calculator!
                </h1>
            </div>

            {/* Calculator Container */}
            <div className="flex justify-center mt-8 sm:ml-10">
                <div className="bg-[#C4A484] w-full max-w-6xl mx-auto border-2 rounded-md pb-4 sm:pb-2">

                    {/* Mode Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 justify-center bg-[#9E7B59] p-4 sm:p-0 rounded-t-md">
                        <button
                            className="transition-colors hover:bg-[#68523B] focus:bg-[#68523B] active:bg-[#55432A] rounded-md px-4 py-2 sm:px-2 sm:py-1 font-medium text-white text-center"
                            onClick={() => {
                                setOwnCalorieIntake(true);
                                setCalorieIntake(undefined);
                            }}
                        >
                            Calculate My Recommended Calorie Consumption
                        </button>
                        <button
                            className="transition-colors hover:bg-[#68523B] focus:bg-[#68523B] active:bg-[#55432A] rounded-md px-4 py-2 sm:px-2 sm:py-1 font-medium text-white text-center"
                            onClick={() => {
                                setOwnCalorieIntake(false);
                                setCalorieIntake(undefined);
                            }}
                        >
                            Calculate Custom Calorie Consumption
                        </button>
                    </div>

                    {/* Info Header */}
                    <div>
                        <h1 className="text-center text-xl sm:text-2xl border-b-2 py-2 bg-[#C4AD97] font-medium">
                            {isOwnCalorieIntake
                                ? "We have imported your personal details from your profile!"
                                : "Calculate Custom Calorie Intake!"}
                        </h1>
                    </div>

                    {/* Calculator & Fetched Data */}
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 border-b-2 py-4 gap-4">
                        <div className="flex justify-center">
                            {isOwnCalorieIntake ? (
                                <CalorieStats handleCalorieIntakeChange={handleCalorieIntakeChange} />
                            ) : (
                                <CustomCalorie handleCalorieIntakeChange={handleCalorieIntakeChange} />
                            )}
                        </div>

                        {calorieIntake && (
                            <div className="flex justify-center">
                                <FetchedCalories calorieIntake={calorieIntake} />
                            </div>
                        )}
                    </div>

                    {/* Calorie Information */}
                    <div className="mt-5 px-4 sm:px-8">
                        <CalorieCountingInformation />
                    </div>

                </div>
            </div>
        </div>
    );
}
