import type {LoginRequest, RegisterRequest, ResetPasswordResponse} from "../types/FormTypes.ts";
import type {ResendTokenType, UserRegisterType} from "../types/User.ts";
import api from "./AxiosConfig.ts";

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

// ------------- Logout -------------

export const logoutUser = async () =>{
 try{
     return await api.post("/auth/logout")
        .then(res => res.data);
 }catch (error){
     const message = (error as Error).message;
     throw new Error(message || "Could not complete request")
 }
}

// ------------- Send password reset token -------------
export const resetPassword = async (email:string) => {
    const res = await fetch("/api/fitness/auth/resetPassword?" + new URLSearchParams({
        email:email
    }).toString() ,{
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(email)
    });
    if (res.ok){
        return await res.json()
    }else {
        const message = await res.text();
        throw new Error(message || "Could not resend verification code");
    }
}

// ------------- Verify Token -------------
export const verifyToken = async (tokenToVerify:string, resetDetails:ResetPasswordResponse) => {
    const res = await fetch("/api/fitness/auth/verifyToken?" + new URLSearchParams({
        otpToVerify:tokenToVerify
    }).toString() ,{
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(resetDetails)
    });
    if (res.ok){
        return await res.json()
    }else {
        const message = await res.text();
        throw new Error(message || "Could not resend verification code");
    }
}

// ------------- Change Password-------------
export const changePassword = async (newPassword:{password:string, email:string}) => {
    const res = await fetch("/api/fitness/auth/confirmReset",{
        method : "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(newPassword)
    });
    if (res.ok){
        const message = await res.text();
        return(message)
    }else {
        const message = await res.text();
        throw new Error(message || "Could not resend verification code");
    }
}