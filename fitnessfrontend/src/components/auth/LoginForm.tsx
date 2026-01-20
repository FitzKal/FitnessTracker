import {type SubmitHandler, useForm} from "react-hook-form";
import type {LoginRequest} from "../../types/FormTypes.ts";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {userLogin} from "../../services/AuthService.ts";
import {UserStore} from "../../stores/UserStore.ts"
import {toast} from "react-toastify";

export default function LoginForm(){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<LoginRequest>();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn:(data:LoginRequest) =>
            userLogin(data),
        onSuccess:(result) =>{
            UserStore.getState().stateLogin({
                accessToken:result.accessToken,
                username:result.username,
                role:result.role
            })
            navigate("/Fitness/home");
            toast.success("Login Successful!");
        },
        onError:(error) =>{
            if (error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Wrong credentials!");
            }
        }
    })

    const onSubmit: SubmitHandler<LoginRequest> = async (data) =>{
        loginMutation.mutate(data);
    }

    return (<div className={"flex flex-col bg-gradient-to-b from-red-500 to-black min-h-screen"}>
        <h1 className={"text-center mb-5 text-6xl text-yellow-100 mt-10"}>Log In</h1>
        <div className={"flex flex-col bg-white self-center border-2 rounded-2xl w-130 p-5"}>
            <form className={"flex flex-col justify-center w-full"} onSubmit={handleSubmit(onSubmit)}>
                <input{...register("username",{
                    required:"Username is required"
                })} placeholder={"Username"} className={"text-black bg-white mb-5 border-2 rounded-md text-center ml-10 mr-10 h-10 mt-15"}/>
                {errors.username &&( <div className={"ml-10 text-red-500"}>{errors.username.message}</div>)}
                <input{...register("password",{
                    required:"Password is required"
                })} placeholder={"Password"} type={"password"} className={"text-black bg-white mb-5 border-2 rounded-md text-center ml-10 mr-10 h-10 " +
                    "mt-8"}/>
                {errors.password &&( <div className={"ml-10 text-red-500"}>{errors.password.message}</div>)}
                <button className={"border-2 rounded-2xl mt-5 p-3 self-center font-semibold " +
                    "bg-gradient-to-b from-red-500 to-black text-white " +
                    "transition duration-300 ease-in-out " +
                    "hover:from-green-600 hover:to-black"}
                >
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
            </form>
            <div>
                <div className={"ml-3 mt-15 flex flex-row justify-between"}>
                    <div>
                        <p className={"text-black"}>New to the Website?</p>
                        <button className={"border-2 rounded-2xl mt-2 p-2 self-center font-semibold " +
                            "bg-gradient-to-b from-orange-400 to-black text-white " +
                            "transition duration-300 ease-in-out " +
                            "hover:from-green-600 hover:to-black"}
                                onClick={() => navigate("/register")} >Register</button>
                    </div>
                    <div className={"mr-2"}>
                        <p className={"text-black"}>Forgot password?</p>
                        <button className={"border-2 rounded-2xl mt-2 p-2 self-center font-semibold " +
                            "bg-gradient-to-b from-orange-400 to-black text-white " +
                            "transition duration-300 ease-in-out " +
                            "hover:from-green-600 hover:to-black"}
                                onClick={() => navigate("/resetPassword")} >Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);

}