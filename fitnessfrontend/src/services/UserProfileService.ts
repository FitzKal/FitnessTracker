// ------------- GetProfile -------------
import api from "./AxiosConfig.ts";
import type {UserProfileDetails} from "../types/User.ts";

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