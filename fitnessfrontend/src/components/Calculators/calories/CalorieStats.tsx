import {useProfileDetails} from "../../../services/UserProfileService.ts";
import {useMutation} from "@tanstack/react-query";
import {calculateOwnCalorieIntake} from "../../../services/CalculatorService.ts";
import type {calorieResponse} from "../../../types/CalculatorTypes.ts";
import {toast} from "react-toastify";
import axios from "axios";
import {Link} from "react-router-dom";

export default function CalorieStats(props:{handleCalorieIntakeChange:(intake:calorieResponse) => void}){
    const {data:details, isLoading:profileLoading,error,isError} = useProfileDetails();
    const missingProfile = isError && axios.isAxiosError(error) && error.response?.status === 404;


    const mutation = useMutation({
        mutationFn:(exerciseType:string) => calculateOwnCalorieIntake(exerciseType),
        onSuccess:(result:calorieResponse) => {
            toast.success("Calorie  intake calculated!");
            props.handleCalorieIntakeChange(result);
        },
        onError:(error) => {
            console.log(error.message);
            toast.error(error.message);
        }
    })

    if (profileLoading && !missingProfile){
        return (<div>Loading...</div>);
    }else if (missingProfile){
        return (
            <div className={"flex flex-col text-center justify-center lg:translate-1/2 lg:translate-x-1/2 lg:translate-y-1"}>
                <p className={"text-2xl"}>It seems like you have not created a profile yet!</p>
                <p className={"text-sm mt-5 lg:text-lg"}>To have your calorie intake calculated from your profile, please create one!</p>
                <div className={"flex justify-center mt-5"}>
                    <Link to={"/Fitness/CreateProfile"} className={"rounded-xl hover:bg-blue-300 font-semibold transition-colors px-6 py-2"}>Create my profile</Link>
                </div>
            </div>
        );
    }
    else {
        return (<div>
            <div className={"flex flex-row ml-3"}>
                <div className={"border-2 mt-2 rounded-lg p-2 bg-[#C4AD97] dark:bg-[#2F2A24] dark:border-surface-border"}>
                    <p>According to your personal statistics:</p>
                    <p>Your height is: {details.height} m</p>
                    <p>Your weight is: {details.weight} kg</p>
                    <p>Your age is: {details.age}</p>
                    <p>Your gender is: {details.gender}</p>
                    <div className={"flex justify-center mt-5 "}>
                        <label className={"mr-1"}>Select your activity level:</label>
                        <select className={"bg-white border-1 rounded-md text-black"} id={"ExType"}>
                            <option value={"SEDENTARY"}>Sedentary: Little to no exercise</option>
                            <option value={"LIGHT"}>Light: Exercise 1-3 times a week</option>
                            <option value={"MODERATE"}>Moderate: Exercise 4-5 times a week</option>
                            <option value={"ACTIVE"}>Active: Daily exercise, or intense exercise at least 3 times a week</option>
                            <option value={"VERY_ACTIVE"}>Very Active: Intense exercise 6-7 times a week</option>
                            <option value={"EXTRA_ACTIVE"}>Extra Active: Intense exercise daily or physical job</option>
                        </select>
                    </div>
                    <div className={"flex justify-center mt-5"}>
                        <button className={"hover:bg-blue-400 rounded-md px-2 mb-2 border-2 bg-blue-300 dark:border-surface-border " +
                            "dark:bg-blue-600 dark:hover:bg-blue-800"}
                                onClick={() => {
                                    const rollDown = document.getElementById("ExType") as HTMLSelectElement;
                                    const value = rollDown.value;
                                    mutation.mutate(value);
                                }}>Calculate daily calorie intake</button>
                    </div>
                </div>
            </div>
        </div>)
    }
}