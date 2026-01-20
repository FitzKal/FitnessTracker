import {UserStore} from "../../stores/UserStore.ts";
import {useProfileDetails} from "../../services/UserProfileService.ts";
import {useLatestGoalDetails} from "../../services/GoalService.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LatestGoalDisplay from "./LatestGoalDisplay.tsx";
import {CakeIcon, CalculatorIcon, TrophyIcon} from "@heroicons/react/16/solid";

export default function HomePage(){
    const currentUser = UserStore.getState().user;
    const[hasProfile,setHasProfile] = useState<boolean>(true);
    const[hasGoal,setHasGoal] = useState<boolean>(true);
    const {isLoading:isProfileLoading,isError:isProfileError,error:profileError} = useProfileDetails();

    const {data:latestGoal,isLoading:isGoalLoading,isError:isGoalError,error:goalError} = useLatestGoalDetails();
    useEffect(() => {
        if (isProfileError && axios.isAxiosError(profileError) && profileError.response?.status === 404){
            setHasProfile(false);
            setHasGoal(false);
        }else if (isGoalError && axios.isAxiosError(goalError) && goalError.response?.status === 404){
            setHasGoal(false);
        }

    }, [profileError,goalError,isGoalError,isProfileError]);


    if (isGoalLoading || isProfileLoading){
        return <div>
            <h1 className={"text-center text-4xl"}>Loading...</h1>
        </div>
    }
    return (
        <div>
            <div className="bg-white shadow-sm border-b border-gray-200 dark:bg-surface dark:border-surface-border">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold ">Welcome {currentUser!.username} to your Fitness Tracker!</h1>
                    </div>
                </div>
            </div>
            <div className={"mx-20 mt-10"}>
                {
                    hasGoal ?
                        <LatestGoalDisplay latestGoal={latestGoal}/>:
                        <div className={"grid grid-cols-1 justify-items-center"}>
                            <h2 className={"text-2xl"}>It looks like you have not started your Fitness Journey Yet!</h2>
                            <Link to={"/Fitness/createFirstGoal"} className={"text-lg text-left lg:text-xl mt-3 hover:text-blue-700"}>To get start it, set a goal, you can click here!</Link>
                            {
                                hasProfile?
                                    <></>:
                                    <Link to={"/Fitness/Profile"} className={"text-lg lg:text-xl mt-3 hover:text-blue-700"}>If you have not set up your profile yet, be sure to finish it before starting a goal, by clicking here!</Link>
                            }
                        </div>
                }
            </div>
            <div className={"flex justify-center mt-10"}>
                <fieldset className={"border-2 border-slate-200 bg-white dark:bg-surface dark:border-surface-border p-5 "}>
                    <legend className={"px-2"}>Additional options</legend>
                    <div className={"grid grid-cols-1 lg:grid-cols-3 gap-5 gap-y-5"}>
                        <div className={"flex flex-col gap-y-2"}>
                            <p>If you need help to calculate you calorie- or protein intake</p>
                            <Link to={"/Fitness/calculator/bmi"} className={"flex flex-row px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}><CalculatorIcon className={"h-6 w-8"}/> Click here to navigate to the calculators!</Link>
                        </div>
                        <div className={"flex flex-col gap-y-2"}>
                            <p>Want to get your daily exercise done?</p>
                            <Link to="/Fitness/workouts" className={"flex flex-row px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}><TrophyIcon className={"h-6 w-8"}/> Click here to jump right to the workouts!</Link>
                        </div>
                        <div className={"flex flex-col gap-y-2"}>
                            <p>Do you have hungry, or crave some delicious food?</p>
                            <Link to="/Fitness/recipes/search" className={"flex flex-row px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl shadow-md transition-colors"}><CakeIcon className={"h-6 w-8"}/> Start browsing our healthy recipes!</Link>
                        </div>
                    </div>
                </fieldset>
            </div>

        </div>
    )
}