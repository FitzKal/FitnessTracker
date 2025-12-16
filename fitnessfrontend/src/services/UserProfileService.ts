
import api from "./AxiosConfig.ts";
import type {UserUpdateRequest} from "../types/User.ts";

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
export const updateUserProfile = async (data:UserUpdateRequest, file:File ) => {
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