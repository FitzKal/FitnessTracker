import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../../stores/UserStore.ts";
import {getUserProfile} from "../../services/UserProfileService.ts";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import UpdateForm from "./UpdateForm.tsx";
import {useNavigate} from "react-router-dom";
import DeleteProfileForm from "./DeleteProfileForm.tsx";

export default function Profile(){
    const currentUser= UserStore.getState().user;
    const [isUpdating,setIsUpdating] = useState<boolean>(false);
    const [isDeleting,setIsDeleting] = useState<boolean>(false);
    const navigate = useNavigate();

    const {data, isLoading} = useQuery({
        queryKey:["profile", currentUser?.username],
        queryFn : async() =>{
            if (!currentUser?.accessToken){
                throw new Error("Could not authenticate");
            }
            return await getUserProfile();
        },
        enabled: !!currentUser?.accessToken,

        retry:(failureCount,error) =>{
            if (axios.isAxiosError(error) && error.response?.status === 404){
                navigate("/Fitness/CreateProfile");
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        }
    });

    const handleUpdating = () =>{
        if (isUpdating){
            setIsUpdating(false)
        }else{
            setIsUpdating(true);
        }
    }

    const handleDeleting = () =>{
        if (isDeleting){
            setIsDeleting(false)
        }else{
            setIsDeleting(true);
        }
    }

    if (isLoading){
        return(<div className={"flex justify-center"}>
            <h1 className={"text-4xl text-center"}>Loading Profile....</h1>
        </div>)
    }else{
        return (<div className={"text-center bg-gradient-to-b bg-white to-blue-300 min-h-screen"}>
            <UpdateForm isUpdating={isUpdating} updateHandler={handleUpdating} userData={data}/>
            <DeleteProfileForm isDeleting = {isDeleting} deleteHandler = {handleDeleting}/>
            <h1 className={" text-4xl font-semibold font-mono mt-5"}>Your Profile</h1>
            <div className={"flex flex-row "}>
                <div className={"flex-col ml-20"}>
                    <img src={data.profilePictureSrc} alt={currentUser?.username}
                    className={"w-auto h-110 mt-10 border-4 rounded-2xl mb-3"}/>
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
                        <span className={"ml-2"}>{data.height} m</span>
                    </div>

                    <div className={"flex flex-row text-2xl"}>
                        <p>Weight: </p>
                        <span className={"ml-2"}>{data.weight} kg</span>
                    </div>

                    <div className={"flex flex-row text-2xl"}>
                        <p>Email: </p>
                        <span className={"ml-2"}>{data.email}</span>
                    </div>
                    <div className={"flex flex-row text-2xl"}>
                        <p>Gender: </p>
                        <span className={"ml-2"}>{data.gender}</span>
                    </div>
                </div>
            </div>
            <div className={"flex flex-row ml-25 mt-7 gap-45"}>
                <button className={"border-2 p-3 rounded-2xl bg-blue-400 hover:bg-blue-500"}
                        onClick={handleUpdating}>Update profile</button>
                <button className={"border-2 p-3 rounded-2xl bg-red-500 hover:bg-red-600"}
                onClick={handleDeleting}>Delete</button>
            </div>
        </div>)
    }
}