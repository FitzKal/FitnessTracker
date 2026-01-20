import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

interface passwordResetState {
        email: string | null,
        setResetState: (email:string, lastOTP : string, otpTime : string) => void,
        stateEmpty: () => void
        stateResetToken: (lastOTP : string, otpTime : string) => void,
        lastOTP : string | null,
        otpTime : string | null
}

export const PasswordResetStore = create<passwordResetState>()(
    persist(
        (set) =>({
            email:null,
            setResetState:(email:string, lastOTP : string, otpTime : string) =>
                set({email,lastOTP,otpTime}),
            stateEmpty:() =>set({email:null, lastOTP:null, otpTime:null}),
            stateResetToken: (lastOTP : string, otpTime : string) =>
                set({lastOTP,otpTime}),
            lastOTP:null,
            otpTime:null
        }),
        {
            name:"PasswordReset",
            storage: createJSONStorage(() => localStorage)
        }
    )
)