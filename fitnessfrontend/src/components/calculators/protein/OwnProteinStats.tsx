import {getUserProfile} from "../../../services/UserProfileService.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {calculateProteinIntakeByProfile} from "../../../services/CalculatorService.ts";
import {toast} from "react-toastify";
import type {proteinResponse} from "../../../types/CalculatorTypes.ts";
import {Link} from "react-router-dom";
import axios from "axios";

export default function OwnProteinStats(props:{handleProteinIntakeChange:(intake:proteinResponse) => void}){
    const {data:details, isLoading:profileLoading, isError, error} = useQuery({
        queryKey:["proteinProfile"],
        queryFn:async() => {
            return await getUserProfile();
        },
        retry:(failureCount,error) =>{
            if (axios.isAxiosError(error) && error.response?.status === 404){
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        }
    });

    const mutation = useMutation({
        mutationFn:(exerciseType:string) => calculateProteinIntakeByProfile(exerciseType),
        onSuccess:(result:proteinResponse) => {
            toast.success("Protein intake calculated!");
            props.handleProteinIntakeChange(result);
        },
        onError:(error) => {
            console.log(error.message);
            toast.error(error.message);
        }
    })

    const missingProfile = isError && axios.isAxiosError(error) && error.response?.status === 404;

    if (profileLoading && !missingProfile){
        return(
            <div className={"flex justify-center"}>
                <h1 className={"text-4xl"}>Loading...</h1>
            </div>
        );
    }

    if (missingProfile){
        return (
            <div className={"flex flex-col text-center justify-center"}>
                <p className={"text-2xl"}>It seems like you have not created a profile yet!</p>
                <p className={"text-sm mt-5 lg:text-xl"}>To have your protein intake calculated from your profile, please create one!</p>
                <div className={"flex justify-center mt-5"}>
                    <Link to={"/Fitness/CreateProfile"} className={"rounded-xl hover:bg-blue-300 font-semibold transition-colors px-6 py-2"}>Create my profile</Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={"text-center text-2xl border-b-2 py-2 bg-gray-200 dark:bg-gray-600 dark:border-surface-border"}>We have imported your personal details from your profile!</h1>
            <div className={"flex flex-row gap-9 mx-20 mt-5"}>
                <p>According to your personal statistics:</p>
                <p>Your height is: {details.height} m</p>
                <p>Your weight is: {details.weight} kg</p>
                <p>Your age is: {details.age}</p>
                <p>Your gender is: {details.gender}</p>
            </div>
            <div className={"flex justify-center mt-5"}>
                <label className={"mr-1"}>Select your activity level:</label>
                <select className={"bg-white border-1 rounded-md dark:border-surface-border text-black"} id={"ExType"}>
                    <option value={"SEDENTARY"}>Sedentary: Little to no exercise</option>
                    <option value={"LIGHT"}>Light: Exercise 1-3 times a week</option>
                    <option value={"MODERATE"}>Moderate: Exercise 4-5 times a week</option>
                    <option value={"ACTIVE"}>Active: Daily exercise, or intense exercise at least 3 times a week</option>
                    <option value={"VERY_ACTIVE"}>Very Active: Intense exercise 6-7 times a week</option>
                    <option value={"EXTRA_ACTIVE"}>Extra Active: Intense exercise daily or physical job</option>
                </select>
            </div>
            <div className={"flex justify-center mt-5"}>
                <button className={"hover:bg-blue-400 rounded-md px-2 mb-2 border-2 bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 dark:border-surface-border"}
                        onClick={() => {
                            const rollDown = document.getElementById("ExType") as HTMLSelectElement;
                            const value = rollDown.value;
                            mutation.mutate(value);
                        }}>Calculate daily protein intake</button>
            </div>
        </div>
    );
}