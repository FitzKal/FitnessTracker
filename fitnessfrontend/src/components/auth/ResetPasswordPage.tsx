import TokenVerification from "./TokenVerification.tsx";
import {useState} from "react";
import ChangePasswordForm from "./ChangePasswordForm.tsx";
export default function ResetPasswordPage(){
    const [isVerifyingToken,setIsVerifyingToken] = useState<boolean>(true);

    const handleTokenVerified = async () => {
        setIsVerifyingToken(!isVerifyingToken);
    }

    return(
        <div className={"flex flex-col bg-gradient-to-b from-green-500 to-black min-h-screen"}>
            <div className={"mt-10"}>
                <h1 className={"text-center text-6xl text-black"}>Reset Password</h1>
            </div>
            <div className={"grid grid-cols-1 justify-items-center" +
                " sm:w-[60%] lg:w-[40%] relative mt-10 lg:mt-0 lg:absolute top-1/2 lg:top-1/4 left-1/2 -translate-x-1/2  bg-white p-5 border-2 border-slate-200 rounded-md"}>
                {
                    isVerifyingToken?
                        <TokenVerification handleTokenVerified={handleTokenVerified}/>:
                        <ChangePasswordForm/>
                }
            </div>
        </div>
    )
}