import {useState} from "react";
import TokenVerificationForm from "./TokenVerificationForm.tsx";
import ConfirmPasswordChangeForm from "./ConfirmPasswordChangeForm.tsx";

export default function PasswordChangeForm(prop:{isChangingPassword:boolean,handlePasswordChanging: () => void, updateHandler:()=>void,
emailAddress:string}){
    const [isTokenVerified,setTokenVerified] = useState<boolean>(false);
    const handleIsVerified = () => {
        setTokenVerified(!isTokenVerified);
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
                    prop.isChangingPassword ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={prop.handlePasswordChanging}
                aria-hidden={!prop.isChangingPassword}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Delete Profile"
                className={`
            fixed z-50
            left-1/2 -translate-x-1/2
            top-4 sm:top-10
            w-[95%] sm:w-auto
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            bg-white dark:bg-surface dark:border-surface-border border-2 rounded-2xl p-5 sm:p-8
            text-center
            transition-all duration-500 ease-out
            ${prop.isChangingPassword
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}
            >
                <h1 className="text-2xl sm:text-4xl mb-6 sm:mb-10 font-semibold">
                    Change your password
                </h1>
                {
                    !isTokenVerified?
                        <TokenVerificationForm handleIsVerified={handleIsVerified}
                                               handlePasswordChanging={prop.handlePasswordChanging}
                                               updateHandler={prop.updateHandler} emailAddress={prop.emailAddress}/>:
                        <ConfirmPasswordChangeForm handlePasswordChanging={prop.handlePasswordChanging} updateHandler={prop.updateHandler}/>
                }

            </div>
        </>
    )
}