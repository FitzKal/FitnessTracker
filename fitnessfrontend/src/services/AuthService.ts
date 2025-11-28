import type {LoginRequest, RegisterRequest} from "../types/FormTypes.ts";
import type {ResendTokenType, UserRegisterType} from "../types/User.ts";

// ------------- LOGIN -------------
export const userLogin = async (loginRequest:LoginRequest) =>{
    const res = await fetch("/api/fitness/auth/login",{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(loginRequest)
    });
    if (res.ok){
        const response = await res.json();
        console.log(response);
        return response;
    }else {
        const message = await res.text();
        throw new Error(message || "Wong login credentials");
    }

}


// ------------- Register -------------
export const registerUser = async (registerRequest:RegisterRequest) =>{
   /* try{
        const res = await api.post("/auth/register",registerRequest)
            .then(response => response.data);
        console.log(res);
        return res
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        throw new Error("There was a problem while registering");
    }*/
    const res = await fetch("/api/fitness/auth/register",{
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(registerRequest),
    });
    if (res.ok){
        const response = await res.json();
        console.log(response);
        return response;
    }else {
        const message = await res.text();
        throw new Error(message || "Something went wrong with the registration");
    }
}

// ------------- Confirm Registration -------------
export const confirmRegister = async (verificationCode:string, userToRegister : UserRegisterType) => {
    // try{
    //     const res = await api.post("/auth/confirmRegister",userToRegister,{
    //         params : {
    //             verificationCode : verificationCode
    //         }
    //     })
    //         .then(response => response.data);
    //     console.log(res);
    //     return res;
    // }catch(error){
    //     const message = (error as Error).message;
    //     console.log(message);
    //     throw new Error("Invalid verification code");
    // }
    const res = await fetch(`/api/fitness/auth/confirmRegister?` + new URLSearchParams({
        verificationCode : verificationCode
    }), {
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(userToRegister),
    });
    if (res.ok){
        const response = await res.json();
        console.log(response);
        return response
    }else {
        const message = await res.text();
        throw new Error(message || "Invalid verification code");
    }
}

// ------------- Resend verification code -------------w
export const resendVerificationCode = async (email:ResendTokenType) => {
    const res = await fetch("/api/fitness/auth/resendCode",{
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(email)
    });
    if (res.ok){
        const response = await res.json();
        console.log(response);
        return response
    }else {
        const message = await res.text();
        throw new Error(message || "Could not resend verification code");
    }
}