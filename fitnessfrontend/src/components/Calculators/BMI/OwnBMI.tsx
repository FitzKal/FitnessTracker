import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../../../stores/UserStore.ts";
import {BMIClassing, calculateByProfile} from "../../../services/BMIService.ts";
import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";
import {useProfileDetails} from "../../../services/UserProfileService.ts";
import ProgressBar from "../ProgressBar.tsx";
import BmiClassificationText from "./BmiClassificationText.tsx";

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

    const bmiScale = BMIClassing(Number(bmiData));


    if (profileLoading || BmiLoading){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }else if(hasProfile){
        return <div>
            <h1 className={"text-center text-2xl mt-1"}>We have calculated your BMI according to your profile data!</h1>
            <div className={"flex flex-row justify-between mx-25"}>
                <div className={"text-xl my-5"}>
                    <p>According to your personal statistics:</p>
                    <p>Your height is: {details.height} m</p>
                    <p>Your weight is: {details.weight} kg</p>
                </div>
                <div className={"w-50 mt-5"}>
                    <div className={"flex flex-row justify-between mb-2"}>
                        <p className={"text-xl"}>Your BMI score: </p>
                        <span className={"text-xl"}>{bmiData}</span>
                    </div>
                    <ProgressBar value={Number(bmiData)}/>
                    <p className={"text-xl"}>Your BMI is <strong className={`${bmiDetails[0]}`}>{bmiDetails[1]}</strong></p>
                </div>
            </div>
            <BmiClassificationText classification ={bmiScale[1]}/>
        </div>
    }
    else{
        return (<div>
            It seems like you have not created a profile yet!
        </div>)
    }

}