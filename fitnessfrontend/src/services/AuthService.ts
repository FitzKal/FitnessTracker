import api from "./AxiosConfig.tsx";
import type {LoginRequest, RegisterRequest} from "../types/FormTypes.ts";

// ------------- LOGIN -------------
export const userLogin = async (loginRequest:LoginRequest) =>{
    try {
        const res = await api.post("/auth/login",loginRequest)
            .then(response =>response.data);
        console.log(res);
        return res;
    }catch (error){
        const message = (error as Error).message;
        console.log(message)
        throw new Error("Incorrect login credentials");
    }

}


// ------------- Register -------------
export const registerUser = async (registerRequest:RegisterRequest) =>{
    try{
        const res = await api.post("/auth/register",registerRequest)
            .then(response => response.data);
        console.log(res);
        return res
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        throw new Error("There was a problem while registering");
    }
}