import {useForm} from "react-hook-form";
import type {Verification} from "../../types/FormTypes.ts";
import {useMutation} from "@tanstack/react-query";
import {confirmRegister, resendVerificationCode} from "../../services/AuthService.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {UserResisterRequestStore} from "../../stores/UserRegisterRequestStore.ts";
import type {ResendTokenType, UserRegisterType} from "../../types/User.ts";
import {useEffect} from "react";


function VerificationPage(){
    const {register,handleSubmit,formState:{isSubmitting}} = useForm<Verification>();
    const navigate = useNavigate();
    const currentRegister : UserRegisterType = {
        user:UserResisterRequestStore.getState().user,
        lastOTP: UserResisterRequestStore.getState().lastOTP,
        otpTime: UserResisterRequestStore.getState().otpTime
    };


    const mutation = useMutation({
        mutationFn : (code:Verification) => confirmRegister(code.verificationCode,currentRegister),
        onSuccess: () =>{
            navigate("/HomePage");
            toast.success("Verification Successful!");
            UserResisterRequestStore.getState().stateEmpty();
        },
        onError:(error) =>{
            if (error instanceof  Error){
                toast.error(error.message);
            }else{
                toast.error("Something went wrong!")
            }
        }
    })

    const verificationMutation = useMutation({
        mutationFn: (email : ResendTokenType) => resendVerificationCode(email),
        onSuccess: (result) =>{
            UserResisterRequestStore.getState().stateResetVerificationCode(
                result.lastOTP,
                result.otpTime
            )
            toast.success("Verification code has been resent! Check your email address!");
        },
        onError:(error) =>{
            if (error instanceof  Error){
                toast.error(error.message);
            }else{
                toast.error("Something went wrong!")
            }
        }
    })

    useEffect(() => {
        console.log(currentRegister)
        if (UserResisterRequestStore.getState().user === null){
            navigate("/register");
        }
    }, []);

    const onSubmit = async (verification:Verification) =>{
        console.log(currentRegister)
        mutation.mutate(verification);
    }

    const onResend = async () =>{
        const email : ResendTokenType = {
            email : currentRegister.user?.email
        }
        verificationMutation.mutate(email);
    }

    return (<div className={"flex flex-col bg-linear-to-b from-blue-500 to-black min-h-screen"}>
        <h1 className={"flex self-center mt-10 mb-5 text-4xl text-white"}>Verify registered account</h1>
        <div className={"flex flex-col self-center border-2 rounded-md bg-white h-100 w-130"}>
            <form className={"flex flex-col self-center mt-22"} onSubmit={handleSubmit(onSubmit)}>
                <input {...register("verificationCode")} placeholder={"Verification code"}
                className={"border-2 mb-10 ml-13 rounded-md text-center w-75 h-10"}/>
                <p className={"flex flex-wrap text-center mb-5 w-100"}>The verification code is only available for 30 minutes! Resend the code if it is expired!</p>
                <button type={"submit"} className={"self-center bg-linear-to-b from-blue-500 to-black border-2 " +
                    "text-white rounded-md w-25 h-10 transition duration-300 ease-in-out hover:from-green-600 hover:to-black"}
                >{isSubmitting ? "Loading..." : "Confirm"}</button>
            </form>
            <button className={"border-2 rounded-md w-50 h-10 self-center mt-5 bg-blue-500 text-white transition duration-200 ease-in-out hover:bg-blue-700 "}
            onClick={onResend}>Resend verification code</button>
        </div>
    </div>);
}

export default VerificationPage;