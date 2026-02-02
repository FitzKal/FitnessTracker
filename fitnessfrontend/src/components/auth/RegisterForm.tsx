import {useForm} from "react-hook-form";
import {type RegisterRequest, schema} from "../../types/FormTypes.ts";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../services/AuthService.ts";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {UserResisterRequestStore} from "../../stores/UserRegisterRequestStore.ts";


export default function RegisterForm(){
    const {register, handleSubmit, formState:{errors,isSubmitting}} = useForm<RegisterRequest>({
        resolver:zodResolver(schema)
    });
    const [passwordError,setPasswordError] = useState<boolean>(false)
    const navigate = useNavigate();
    const onSubmit = async (data:RegisterRequest) =>{
        try {
            const password = (document.getElementById("password") as HTMLInputElement)?.value;
            const confirm = (document.getElementById("confirm") as HTMLInputElement)?.value;
            if (password === confirm){
                setPasswordError(false)
                registerMutation.mutate(data);
            }else{
                throw new Error("The entered passwords don't match");
            }
        }catch (error){
            const errorMessage = (error as Error).message;
            toast.error(errorMessage);
            setPasswordError(true);
        }
    }
    const registerMutation = useMutation({
        mutationFn:(data:RegisterRequest) =>
            registerUser(data),
        onSuccess:(result) =>{
            UserResisterRequestStore.getState().stateRegister(
                 result.user,
                result.lastOTP,
                result.otpTime
            )
            navigate("/VerificationPage");
            toast.success("Verification code sent to your email address");
        },
        onError:(error) =>{
            if (error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Something went wrong!");
            }
        }
    })


    return(<div className={"flex flex-col bg-gradient-to-b from-orange-400 to-black min-h-screen"}>
        <h1 className={"text-center mb-5 text-5xl text-yellow-100 mt-10"}>Register</h1>
        <div className={"flex flex-col bg-white self-center border-2 rounded-2xl w-200 h-120"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col ml-18 justify-center"}>
                <div className={"flex flex-row gap-10 mt-15"}>
                    <div className={"flex flex-col"}>
                    <input {...register("username")} placeholder={"username"}
                       className={"text-black bg-white border-2 rounded-md text-center w-75 h-10"}/>
                <div className={"text-red-500 h-5"}>{errors.username?.message}</div>
                    </div>
                    <div className={"flex flex-col relative"}>
                <input {...register("email")} placeholder={"email"}
                       className={"text-black bg-white border-2 rounded-md text-center w-75 h-10"}/>
                <div className={"text-red-500 h-5"}>{errors.email?.message}</div>
                    </div>
                </div>
                <div className={"flex flex-col justify-center"}>
                    <input{...register("password")} placeholder={"password"} id={"password"}
                          className={"text-black bg-white flex self-center border-2 mr-20 mt-10 rounded-md text-center w-75 h-10"} type={"password"}/>
                    <div className={"self-center mr-20 text-center text-red-500 h-5 w-75"}>{errors.password?.message}</div>
                    <input placeholder={"Confirm Password"} id={"confirm"}
                          className={"text-black bg-white flex self-center border-2 mr-20 mt-10 rounded-md text-center w-75 h-10"} type={"password"}/>
                    <div className={"self-center mr-20 text-center text-red-500 h-5 w-75"}>{passwordError ? "The entered passwords don't match" : ""}</div>
                </div>
                <button className={"border-2 rounded-2xl mr-20 mt-10 w-25 h-10 self-center font-semibold " +
                    "bg-gradient-to-b from-orange-400 to-black text-white " +
                    "transition duration-300 ease-in-out " +
                    "hover:from-green-600 hover:to-black"} disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "Register"}
                </button>
            </form>
            <div className={"ml-15"}>
                <p className={"text-black"}>Already have an account?</p>
                <button className={"border-2 rounded-2xl mt-2 w-25 self-center font-semibold " +
                    "bg-gradient-to-b from-red-500 to-black text-white " +
                    "transition duration-300 ease-in-out " +
                    "hover:from-green-600 hover:to-black"}
                        onClick={() => navigate("/login")} >Log in!</button>
            </div>
        </div>
    </div>);
}