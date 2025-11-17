// ------------- LOGIN -------------
import type {LoginRequest, RegisterRequest} from "../types/FormTypes.ts";

export const userLogin = async (loginRequest:LoginRequest) =>{
    const res = await fetch("/api/fitness/auth/login",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(loginRequest)
    });
    if (res.ok){
        const response = await res.json();
        console.log(response);
        return response;
    }
    else{
        const message = await res.text();
        throw new Error(message || "Something went wrong");
    }
}

// ------------- Register -------------
export const registerUser = async (registerRequest:RegisterRequest) =>{
    const res = await fetch("/api/fitness/auth/register",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(registerRequest)
    });
    if (res.ok){
        const response = await res.json();
        console.log(response);
        return response;
    }
    else{
        const message = await res.text();
        throw new Error(message || "Something went wrong");
    }
}