import type {User} from "../types/User.ts";
import {create} from "zustand/react";
import { createJSONStorage, persist } from "zustand/middleware";
interface UserState {
    user: User | null,
    stateLogin: (user:User) => void,
    stateLogout: () => void
}

export const UserStore = create<UserState>()(
    persist(
        (set) =>({
            user:null,
            stateLogin:(user:User) =>set({user}),
            stateLogout:() =>set({user:null})
        }),
        {
            name:"userStore",
            storage: createJSONStorage(()=>localStorage)
        }
    )
)
