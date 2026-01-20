import {useForm} from "react-hook-form";
import type {PasswordReset} from "../../types/FormTypes.ts";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {PasswordResetStore} from "../../stores/PasswordResetStore.ts";
import {changePassword} from "../../services/AuthService.ts";

export default function ConfirmPasswordChangeForm(prop:{handlePasswordChanging: () => void, updateHandler:()=>void}){
    const {register,handleSubmit,formState:{isSubmitting}} = useForm<PasswordReset>()
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
            prop.handlePasswordChanging();
            PasswordResetStore.getState().stateEmpty();
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

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex flex-col mb-5"}>
                    <div className={"flex flex-col"}>
                        <label className={"text-left text-lg"}>New Password</label>
                        <input {...register("password")} type={"password"} id={"password"}
                        className={"border-2 rounded-xl text-black bg-white text-center"} placeholder={"Enter new password"}/>
                    </div>
                    <div className={"flex flex-col  mt-5"}>
                        <label className={"text-left text-lg"}>Confirm Password</label>
                        <input type={"password"} id={"confirm"}
                               className={"border-2 rounded-xl text-black bg-white text-center"} placeholder={"Confirm password"}/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:gap-10">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-xl dark:bg-gray-600 dark:hover:bg-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold transition-colors w-full sm:w-auto"
                        onClick={()=> {
                            prop.handlePasswordChanging();
                            prop.updateHandler();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-green-300 dark:bg-green-600 hover:bg-green-400 dark:hover:bg-green-800 text-white font-bold transition-colors shadow-lg w-full sm:w-auto"
                        disabled={isSubmitting}
                    >
                        {isSubmitting?"Sending...":"Confirm password change"}
                    </button>
                </div>
            </form>
        </div>
    )
}