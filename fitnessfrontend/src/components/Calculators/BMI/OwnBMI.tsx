import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../../../stores/UserStore.ts";
import {BMIClassing, calculateByProfile} from "../../../services/BMIService.ts";
import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";
import {useProfileDetails} from "../../../services/UserProfileService.ts";
import ProgressBar from "../ProgressBar.tsx";
import BmiClassificationText from "./BmiClassificationText.tsx";
import {Link} from "react-router-dom";

export default function OwnBMI(){

    const [hasProfile, setHasProfile] = useState<boolean>(true);

    const {data:bmiData, isLoading:BmiLoading} = useQuery({
        queryKey:["bmi"],
        queryFn: async () => {
            if (!UserStore.getState().user?.accessToken){
                throw new Error("Could not authenticate");
            }
            return await calculateByProfile();
        },
        enabled: !!UserStore.getState().user?.accessToken,
        retry:(failureCount,error) =>{
            if (axios.isAxiosError(error) && error.response?.status === 404){
                setHasProfile(false);
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        }
    })
    const bmiDetails = BMIClassing(Number(bmiData));

    const {data:details,isLoading:profileLoading} = useProfileDetails();

    if (profileLoading || BmiLoading){
        return (
            <div className={"text-center"}>
                <p>Loading...</p>
            </div>
        )
    }else if(hasProfile){
        return <div>
            <h1 className={"text-center text-2xl mt-1"}>We have calculated your BMI according to your profile data!</h1>
            <div className={"flex flex-row justify-between mx-20"}>
                <div className={"text-xl my-5"}>
                    <p>According to your personal statistics:</p>
                    <p>Your height is: {details.height} m</p>
                    <p>Your weight is: {details.weight} kg</p>
                </div>
                <div className={"w-[250px] mt-5"}>
                    <div className={"flex flex-row justify-between mb-2"}>
                        <p className={"text-xl"}>Your BMI score: </p>
                        <span className={"text-xl"}>{bmiData}</span>
                    </div>
                    <ProgressBar value={Number(bmiData)}/>
                    <p className={"text-xl"}>Your BMI is <strong className={`${bmiDetails[0]}`}>{bmiDetails[1]}</strong></p>
                </div>
            </div>
            <BmiClassificationText classification ={bmiDetails[1]}/>
        </div>
    }
    else{
        return (<div className={"flex flex-col text-center justify-center"}>
            <p className={"text-2xl"}>It seems like you have not created a profile yet!</p>
            <p className={"text-lg mt-5"}>To have your BMI calculated from your profile, please create one!</p>
            <div className={"flex justify-center mt-5"}>
                <Link to={"/Fitness/CreateProfile"} className={"rounded-xl bg-blue-100 hover:bg-blue-300 font-semibold transition-colors px-6 py-2"}>Create my profile</Link>
            </div>
        </div>)
    }

}