import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../../stores/UserStore.ts";
import {getUserProfile} from "../../services/UserProfileService.ts";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

export default function Profile(){
    const currentUser= UserStore.getState().user;
    const [profileExists,setProfileExists] = useState<boolean>(true);

    const {data, error, isError, isLoading} = useQuery({
        queryKey:["profile"],
        queryFn : async() =>{
            if (!currentUser?.accessToken){
                throw new Error("Could not authenticate");
            }
            return await getUserProfile();
        },
        enabled: !!currentUser?.accessToken
    });

    useEffect(() => {
        if (isError && error instanceof AxiosError){
            if (error.response?.status === 404){
                setProfileExists(false);
            }
            toast.error("Something went wrong when fetching the profile");
        }
    }, [error,isError]);

    if (isLoading){
        return(<div className={"flex justify-center"}>
            <h1 className={"text-4xl text-center"}>Loading Profile....</h1>
        </div>)
    } else if(!profileExists){
        return(<div className={"flex justify-center"}>
            <h1 className={"text-4xl text-center"}>You don't have a profile, please create one!</h1>
        </div>)
    }else{
        return (<div className={"text-center bg-gradient-to-b bg-white to-blue-300 min-h-screen"}>
            <h1 className={" text-4xl font-semibold font-mono mt-"}>Your Profile</h1>
            <div className={"flex flex-row "}>
                <div className={"flex-col ml-20"}>
                    <img src={data.profilePictureSrc} alt={currentUser?.username}
                    className={"w-110 h-110 mt-10 rounded-2xl mb-3"}/>
                    <span className={"ml-2 text-xl"}>{currentUser?.username}</span>
                </div>

                <div className={"flex flex-col ml-20 mt-10 mb-7 gap-8 border-2 p-5 rounded-2xl bg-white"}>
                    <div className={"flex flex-row text-2xl"}>
                        <p>First Name: </p>
                        <span className={"ml-2"}>{data.firstName}</span>
                    </div>

                    <div className={"flex flex-row text-2xl"}>
                        <p>Last Name: </p>
                        <span className={"ml-2"}>{data.lastName}</span>
                    </div>

                    <div className={"flex flex-row text-2xl"}>
                        <p>Username: </p>
                        <span className={"ml-2"}>{currentUser?.username}</span>
                    </div>

                    <div className={"flex flex-row text-2xl"}>
                        <p>Height: </p>
                        <span className={"ml-2"}>{data.height} cm</span>
                    </div>

                    <div className={"flex flex-row text-2xl"}>
                        <p>Weight: </p>
                        <span className={"ml-2"}>{data.weight} kg</span>
                    </div>

                    <div className={"flex flex-row text-2xl"}>
                        <p>Email: </p>
                        <span className={"ml-2"}>{data.email}</span>
                    </div>
                </div>
            </div>
            <div className={"flex flex-row ml-25 mt-7 gap-45"}>
                <button className={"border-2 p-3 rounded-2xl bg-blue-400 hover:bg-blue-500"}>Update profile</button>
                <button className={"border-2 p-3 rounded-2xl bg-red-500 hover:bg-red-600"}>Delete</button>
            </div>
        </div>)
    }
}