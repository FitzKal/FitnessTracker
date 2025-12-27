import {useProfileDetails} from "../../../services/UserProfileService.ts";
import {useMutation} from "@tanstack/react-query";
import {calculateProteinIntakeByProfile} from "../../../services/CalculatorService.ts";
import {toast} from "react-toastify";
import type {proteinResponse} from "../../../types/CalculatorTypes.ts";

export default function OwnProteinStats(props:{handleProteinIntakeChange:(intake:proteinResponse) => void}){
    const {data:details, isLoading:profileLoading} = useProfileDetails();

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

    if (profileLoading){
        return(
            <div className={"flex justify-center"}>
                <h1 className={"text-4xl"}>Loading...</h1>
            </div>
        );
    }else {
        return (
            <div>
                <h1 className={"text-center text-2xl border-b-2 py-2 bg-gray-200"}>We have imported your personal details from your profile!</h1>
                <div className={"flex flex-row gap-10 mx-20 mt-5"}>
                    <p>According to your personal statistics:</p>
                    <p>Your height is: {details.height} m</p>
                    <p>Your weight is: {details.weight} kg</p>
                    <p>Your age is: {details.age}</p>
                    <p>Your gender is: {details.gender}</p>
                </div>
                <div className={"flex justify-center mt-5"}>
                    <label className={"mr-1"}>Select your activity level:</label>
                    <select className={"bg-white border-1 rounded-md"} id={"ExType"}>
                        <option value={"SEDENTARY"}>Sedentary: Little to no exercise</option>
                        <option value={"LIGHT"}>Light: Exercise 1-3 times a week</option>
                        <option value={"MODERATE"}>Moderate: Exercise 4-5 times a week</option>
                        <option value={"ACTIVE"}>Active: Daily exercise, or intense exercise at least 3 times a week</option>
                        <option value={"VERY_ACTIVE"}>Very Active: Intense exercise 6-7 times a week</option>
                        <option value={"EXTRA_ACTIVE"}>Extra Active: Intense exercise daily or physical job</option>
                    </select>
                </div>
                <div className={"flex justify-center mt-5"}>
                    <button className={"hover:bg-blue-400 rounded-md px-2 mb-2 border-2 bg-blue-300"}
                            onClick={() => {
                                const rollDown = document.getElementById("ExType") as HTMLSelectElement;
                                const value = rollDown.value;
                                mutation.mutate(value);
                            }}>Calculate daily protein intake</button>
                </div>
            </div>
        );
    }
}