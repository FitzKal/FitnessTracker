import {useForm} from "react-hook-form";
import type {Verification} from "../../types/FormTypes.ts";
import {useMutation} from "@tanstack/react-query";
import {confirmRegister} from "../../services/AuthService.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {UserResisterRequestStore} from "../../stores/UserRegisterRequestStore.ts";
import type {UserRegisterType} from "../../types/User.ts";


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

    const onSubmit = async (verification:Verification) =>{
        console.log(currentRegister)
        mutation.mutate(verification);
    }

    return (<div className={"flex flex-col bg-linear-to-b from-blue-500 to-black min-h-screen"}>
        <h1 className={"flex self-center mt-10 mb-5 text-4xl text-white"}>Verify registered account</h1>
        <div className={"flex self-center border-2 rounded-md bg-white h-100 w-130"}>
            <form className={"flex flex-col self-center"} onSubmit={handleSubmit(onSubmit)}>
                <input {...register("verificationCode")} placeholder={"Verification code"}
                className={"border-2 mb-10 ml-25 rounded-md text-center w-75 h-10"}/>
                <p className={"flex flex-wrap text-center mb-10"}>The verification code is only available for 30 minutes! Resend the code if it is expired!</p>
                <button type={"submit"} className={"self-center bg-linear-to-b from-blue-500 to-black border-2 " +
                    "text-white rounded-md w-25 h-10 transition duration-300 ease-in-out hover:from-green-600 hover:to-black"}
                >{isSubmitting ? "Loading..." : "Confirm"}</button>
            </form>
        </div>
    </div>);
}

export default VerificationPage;