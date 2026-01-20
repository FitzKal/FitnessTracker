import {Link} from "react-router-dom";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {resetPassword, verifyToken} from "../../services/AuthService.ts";
import {PasswordResetStore} from "../../stores/PasswordResetStore.ts";
import {toast} from "react-toastify";
import type {ResetPasswordResponse} from "../../types/FormTypes.ts";

export default function TokenVerification(prop:{handleTokenVerified:() => void}){

    const [isTokenSent,setIsTokenSent] = useState<boolean>(false);

    const sendPasswordResetRequest = useMutation({
        mutationFn: (email: string) => resetPassword(email),
        onSuccess: (result,variables) => {
            console.log(variables);
            PasswordResetStore.getState().setResetState(
                variables,
                result.lastOTP,
                result.otpTime
            )
            setIsTokenSent(true);
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
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
                prop.handleTokenVerified()
                toast.success("The token was valid!");
            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong!");
            }
        }
    })

    return(
        <div className={"w-full"}>
            {
                !isTokenSent?
                    <div className={"flex flex-col"}>
                        <label className={"text-left text-black text-lg"}>Enter your email address</label>
                        <input id={"searchBar"} className={"border-2 rounded-md text-black bg-white text-center"} type={"email"} placeholder={"email"}/>
                    </div>:
                    <div className={"flex flex-col"}>
                        <label className={"text-left text-black text-lg"}>Enter your reset token</label>
                        <input id={"searchBar"} className={"border-2 rounded-md text-black bg-white text-center"} type={"number"} placeholder={"12345"}/>
                    </div>
            }
            <div className={"flex flex-col  mt-5"}>
                {
                    !isTokenSent?
                        <button className={"border-2 rounded-2xl mt-2 p-2 self-center font-semibold " +
                            "bg-gradient-to-b from-orange-400 to-black text-white " +
                            "transition duration-300 ease-in-out " +
                            "hover:from-green-600 hover:to-black"}
                                onClick={() => {
                                    const searchBar = document.getElementById("searchBar") as HTMLInputElement;
                                    const value = searchBar.value;
                                    return sendPasswordResetRequest.mutate(value);
                                }}>Send password reset code</button>:
                        <button className={"border-2 rounded-2xl mt-2 p-2 self-center font-semibold " +
                            "bg-gradient-to-b from-orange-400 to-black text-white " +
                            "transition duration-300 ease-in-out " +
                            "hover:from-green-600 hover:to-black"}
                                onClick={() => {
                                    const searchBar = document.getElementById("searchBar") as HTMLInputElement;
                                    const value = searchBar.value;
                                    return verifyTokenMutation.mutate(value);
                                }}>Verify token</button>
                }
                <Link to={"/login"} className={"border-2 rounded-2xl mt-2 p-2 self-center font-semibold " +
                    "bg-gradient-to-b from-red-500 to-black text-white " +
                    "transition duration-300 ease-in-out " +
                    "hover:from-green-600 hover:to-black"}>Back to the Login page</Link>
            </div>
        </div>

    )

}