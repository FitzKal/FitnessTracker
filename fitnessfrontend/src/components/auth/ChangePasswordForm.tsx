import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {PasswordResetStore} from "../../stores/PasswordResetStore.ts";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {changePassword} from "../../services/AuthService.ts";
import type {PasswordReset} from "../../types/FormTypes.ts";

export default function ChangePasswordForm(){
    const {register,handleSubmit,formState:{isSubmitting}} = useForm<PasswordReset>();
    const navigate = useNavigate();
    const onSubmit = async (passwordToMutate:PasswordReset) =>{
        try {
            const password = (document.getElementById("password") as HTMLInputElement)?.value;
            const confirm = (document.getElementById("confirm") as HTMLInputElement)?.value;
            if (password === confirm && password?.length > 5){
                changePasswordMutation.mutate(passwordToMutate);
            }else{
                throw new Error("The entered passwords don't match, or the password is too weak");
            }
        }catch (error){
            const errorMessage = (error as Error).message;
            toast.error(errorMessage);
        }
    }

    const changePasswordMutation = useMutation({
        mutationFn:(password:PasswordReset) => {
            const email = PasswordResetStore.getState().email;
            const changeRequest:{password:string, email:string} = {
                password:password.password,
                email:email!
            }
            return changePassword(changeRequest);
        },
        onSuccess:(result) => {
            toast.success(result);
            PasswordResetStore.getState().stateEmpty();
            navigate("/login")
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error)
            } else {
                toast.error("Something went wrong!");
            }
        }
    })

    return (
        <div className={"w-full"}>
            <div className={"flex justify-center"}>
                <p className={"text-xl  text-black"}>Change your password!</p>
            </div>
            <div className={"mt-5"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"flex flex-col"}>
                        <div className={"flex flex-col"}>
                            <label className={"text-left text-black"}>Enter new password</label>
                            <input {...register("password")} id={"password"} placeholder={"new password"}
                             className={"border-2 rounded-md text-center text-black bg-white"} type={"password"} required={true}/>
                        </div>
                        <div className={"flex flex-col mt-5"}>
                            <label className={"text-left text-black"}>Confirm password</label>
                            <input type={"password"} id={"confirm"} placeholder={"confirm password"}
                                   className={"border-2 rounded-md text-center text-black bg-white"} required={true}/>
                        </div>
                        <div className={"flex justify-between mt-5"}>
                            <Link to={"/login"} className={"border-2 rounded-2xl mt-2 p-2 self-center font-semibold " +
                                "bg-gradient-to-b from-red-500 to-black text-white " +
                                "transition duration-300 ease-in-out " +
                                "hover:from-green-600 hover:to-black"}
                                  onClick={() => {
                                      PasswordResetStore.getState().stateEmpty();
                                  }}>Back to the Login page</Link>
                            <button className={"border-2 rounded-2xl mt-2 p-2 self-center font-semibold " +
                                "bg-gradient-to-b from-orange-400 to-black text-white " +
                                "transition duration-300 ease-in-out " +
                                "hover:from-green-600 hover:to-black"} disabled={isSubmitting}>
                                {isSubmitting?"Submitting...": "Change Password"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}