import CalorieStats from "./CalorieStats.tsx";
import {useState} from "react";
import type {calorieResponse} from "../../../types/CalculatorTypes.ts";
import FetchedCalories from "./FetchedCalories.tsx";
import CalorieCountingInformation from "./CalorieCountingInformation.tsx";
import CustomCalorie from "./CustomCalorie.tsx";

export default function CalorieCalculator(){
    const [calorieIntake, setCalorieIntake] = useState<calorieResponse>();
    const [isOwnCalorieIntake, setOwnCalorieIntake] = useState<boolean>(true);

    const handleCalorieIntakeChange = (intake:calorieResponse) =>{
        setCalorieIntake(intake);
    }

    return (
      <div className={"bg-gradient-to-b bg-white to-blue-300 min-h-screen"}>
        <div className={"flex justify-center"}>
            <div>
                <h1 className={"text-4xl mt-13"}>Welcome to the Calorie calculator!</h1>
            </div>
        </div>
                <div className={"flex justify-center mt-10"}>
                    <div className="bg-[#C4A484] lg:w-full max-w-6xl mx-auto border-2 rounded-md pb-2 sm:w-auto">
                        <div className={"flex flex-row gap-12 justify-center bg-[#9E7B59]"}>
                            <button className={"transition:bg-color hover:bg-[#68523B] rounded-md px-2"}
                            onClick={() => {
                                setOwnCalorieIntake(true);
                                setCalorieIntake(undefined)
                            }}>
                                Calculate my recommended calorie consumption!</button>
                            <button className={"transition:bg-color hover:bg-[#68523B] rounded-md px-2"}
                            onClick={() => {
                                setOwnCalorieIntake(false);
                                setCalorieIntake(undefined)
                            }}>
                                Calculate custom calorie consumption!</button>
                        </div>
                        <h1 className={"text-center text-2xl border-b-2 py-2 bg-[#C4AD97]"}>We have imported your personal details from your profile!</h1>
                        <div className={"flex flex-row gap-7 border-b-2 py-2"}>
                            <div>
                                {isOwnCalorieIntake?
                                    <CalorieStats handleCalorieIntakeChange ={handleCalorieIntakeChange}/>:
                                <CustomCalorie handleCalorieIntakeChange ={handleCalorieIntakeChange}/>}
                            </div>
                            {
                                calorieIntake?
                                    <FetchedCalories calorieIntake ={calorieIntake}/>:
                                    <></>
                            }
                        </div>
                            <div className={"mt-5 flex flex-col"}>
                                <CalorieCountingInformation/>
                            </div>
                    </div>
                </div>
      </div>
    );
}