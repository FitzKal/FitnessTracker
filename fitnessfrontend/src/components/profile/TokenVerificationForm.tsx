import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {resetPassword, verifyToken} from "../../services/AuthService.ts";
import {toast} from "react-toastify";
import {PasswordResetStore} from "../../stores/PasswordResetStore.ts";
import type {ResetPasswordResponse} from "../../types/FormTypes.ts";

export default function TokenVerificationForm(
    prop:{handleIsVerified:() => void, handlePasswordChanging: () => void, updateHandler:()=>void, emailAddress:string}
){
    const [isSending,setIsSending] = useState<boolean>(false)
    const [isVerifying,setIsVerifying] = useState<boolean>(false)
    const sendPasswordResetRequest = useMutation({
        mutationFn: (email: string) => resetPassword(email),
        onSuccess: (result,variables) => {
            toast.success("The token has been sent to your email!")
            PasswordResetStore.getState().setResetState(
                variables,
                result.lastOTP,
                result.otpTime
            )
            setIsSending(false);
        },
        onError: (error) => {
            if (error instanceof Error) {
                setIsSending(false);
                toast.error(error.message);
            } else {
                setIsSending(false);
                toast.error("Something went wrong!");
            }
        }

    })

    const verifyTokenMutation = useMutation({
        mutationFn: (resetToken: string) => {
            const resetDetails:ResetPasswordResponse = {
                lastOTP:PasswordResetStore.getState().lastOTP,
                otpTime:PasswordResetStore.getState().otpTime
            }
            return verifyToken(resetToken,resetDetails);
        },
        onSuccess: (result) => {
            if (result === true){
                toast.success("The token was valid!");
                setIsVerifying(false)
                prop.handleIsVerified()
            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
                setIsVerifying(false)
            } else {
                toast.error("Something went wrong!");
                setIsVerifying(false)
            }
        }
    })

    return(
        <div>
            <div>
                <p>For changing your password, you will need a password change token!</p>
                <p>For acquiring this token, you can have it sent to your email by clicking the button below!</p>
                <p>A verification code is valid for 30 minutes after being sent!</p>
                <div className={"flex flex-col my-5"}>
                    <label className={"text-left"}>Enter verification code</label>
                    <input id={"search"} className={"bg-white text-black border-2 rounded-xl text-center"}
                           type={"number"} placeholder={"12345"}/>
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
                        type="button"
                        className="px-6 py-2 rounded-xl bg-yellow-300 dark:bg-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-800 text-white font-bold transition-colors shadow-lg w-full sm:w-auto"
                        onClick={() => {
                            setIsSending(true)
                            sendPasswordResetRequest.mutate(prop.emailAddress);
                        }}
                        disabled={isSending}
                    >
                        {isSending?"Sending...":"Send change token"}
                    </button>
                <button
                    type="button"
                    className="px-6 py-2 rounded-xl bg-green-300 dark:bg-green-600 hover:bg-green-400 dark:hover:bg-green-800 text-white font-bold transition-colors shadow-lg w-full sm:w-auto"
                    onClick={() => {
                        setIsVerifying(true);
                        const searchBar = document.getElementById("search") as HTMLInputElement;
                        const value = searchBar.value;
                        return verifyTokenMutation.mutate(value);
                    }}
                    disabled={isVerifying}
                >
                    {isVerifying?"verifying...":"Verify Token"}
                </button>
            </div>
        </div>
    )
}