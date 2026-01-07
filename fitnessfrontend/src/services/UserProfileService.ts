// ------------- GetProfile -------------
import api from "./AxiosConfig.ts";
import type {UserProfileDetails} from "../types/User.ts";
import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../stores/UserStore.ts";
import axios from "axios";
import {toast} from "react-toastify";

const currentUser = UserStore.getState().user;

export const getUserProfile = async () => {
    try {
        const res = api.get("/profile",{
        })
            .then(res => res.data);
        console.log(res);
        return res;
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

// ------------- UpdateProfile -------------
export const updateUserProfile = async (data:UserProfileDetails, file:File ) => {
    const formData = new FormData();
    formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    if (file) {
        formData.append("file", file);
    }

    try {
        const res = api.put("/profile",formData,{
            headers:{
                "Content-Type": undefined
            }
        })
            .then(res => res.data);
        console.log(res);
        return res;
    }catch(error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

//------------- PostProfile -------------
export const postUserProfile = async (data:UserProfileDetails, file:File) => {
    const formData = new FormData();
    formData.append("data",
        new Blob([JSON.stringify(data)],{type:"application/json"}));

    if (file){
        formData.append("file",
            file);
    }
    try {
        return api.post("/profile", formData, {
            headers: {
                "Content-Type": undefined
            }
        })
            .then(res => res.data)
            .then(data => console.log(data));
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
    }
}

//------------- PostProfile -------------
export const deleteUserProfile= async () =>{
    try {
        return api.delete("/profile")
            .then(res => res.data)
            .then(data => console.log(data));
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
    }
}

export function useProfileDetails ()
{
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            if (!currentUser?.accessToken) {
                throw new Error("Could not authenticate");
            }
            return await getUserProfile();
        },
        enabled: !!currentUser?.accessToken,
        retry:(failureCount,error) =>{
            if (axios.isAxiosError(error) && error.response?.status === 404){
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        }
    })
}