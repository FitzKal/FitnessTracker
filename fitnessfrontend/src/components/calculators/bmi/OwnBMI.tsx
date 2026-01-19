import { useQuery } from "@tanstack/react-query";
import { UserStore } from "../../../stores/UserStore.ts";
import { BMIClassing, calculateByProfile } from "../../../services/CalculatorService.ts";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useProfileDetails } from "../../../services/UserProfileService.ts";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar.tsx";
import BmiClassificationText from "./BmiClassificationText.tsx";

export default function OwnBMI() {
    const [hasProfile, setHasProfile] = useState<boolean>(true);

    const { data: bmiData, isLoading: BmiLoading } = useQuery({
        queryKey: ["bmi"],
        queryFn: async () => {
            const token = UserStore.getState().user?.accessToken;
            if (!token) {
                throw new Error("Could not authenticate");
            }
            return await calculateByProfile();
        },
        enabled: !!UserStore.getState().user?.accessToken,
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setHasProfile(false);
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        }
    });

    const { data: details, isLoading: profileLoading, isError: profileError } = useProfileDetails();

    if (profileLoading || BmiLoading) {
        return (
            <div className={"text-center"}>
                <p>Loading...</p>
            </div>
        );
    }

    else if (hasProfile && details && !profileError) {

        const bmiValue = Number(bmiData);
        const bmiDetails = BMIClassing(bmiValue);

        return (
            <div>
                <h1 className={"text-center text-2xl mt-1"}>We have calculated your BMI according to your profile data!</h1>
                <div className={"grid lg:grid-cols-2 sm:grid-cols-1 justify-between mx-10"}>
                    <div className={"text-xl my-5"}>
                        <p>According to your personal statistics:</p>
                        <p>Your height is: {details.height} m</p>
                        <p>Your weight is: {details.weight} kg</p>
                    </div>
                    <div className={"w-[250px] mt-5"}>
                        <div className={"flex flex-row justify-between mb-2"}>
                            <p className={"text-xl"}>Your BMI score: </p>
                            <span className={"text-xl"}>{bmiValue.toFixed(1)}</span>
                        </div>
                        <ProgressBar value={bmiValue}/>
                        <p className={"text-xl"}>Your BMI is <strong className={bmiDetails?.[0]}>{bmiDetails?.[1]}</strong></p>
                    </div>
                </div>
                <BmiClassificationText classification={bmiDetails?.[1]}/>
            </div>
        );
    }

    else {
        return (
            <div className={"flex flex-col text-center justify-center"}>
                <p className={"text-2xl"}>It seems like you have not created a profile yet!</p>
                <p className={"text-lg mt-5"}>To have your BMI calculated from your profile, please create one!</p>
                <div className={"flex justify-center mt-5"}>
                    <Link to={"/Fitness/CreateProfile"} className={"rounded-xl bg-blue-100 dark:bg-blue-600 dark:hover:bg-blue-800 hover:bg-blue-300 font-semibold transition-colors px-6 py-2"}>Create my profile</Link>
                </div>
            </div>
        );
    }
}