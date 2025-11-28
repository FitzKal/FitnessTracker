import type {User} from "../types/User.ts";
import {create} from "zustand/react";
import { createJSONStorage, persist } from "zustand/middleware";
interface RegisterState {
    user: User | null,
    stateRegister: (user:User, lastOTP : string, otpTime : string) => void,
    stateEmpty: () => void
    stateResetVerificationCode: (lastOTP : string, otpTime : string) => void,
    lastOTP : string | null,
    otpTime : string | null
}

export const UserResisterRequestStore = create<RegisterState>()(
    persist(
        (set) =>({
            user:null,
            stateRegister:(user:User, lastOTP : string, otpTime : string) =>
                set({user,lastOTP,otpTime}),
            stateEmpty:() =>set({user:null, lastOTP:null, otpTime:null}),
            stateResetVerificationCode: (lastOTP : string, otpTime : string) =>
                set({lastOTP,otpTime}),
            lastOTP:null,
            otpTime:null
        }),
        {
            name:"TemporaryRegisterStore",
            storage: createJSONStorage(() => localStorage)
        }
    )
)