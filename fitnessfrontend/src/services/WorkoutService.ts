import api from "./AxiosConfig.ts";
import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../stores/UserStore.ts";


const currentUser = UserStore.getState().user;

// ------------- GetAllWorkouts ------------
export const getAllWorkouts = async (before?:string, after?:string) => {
    try {
        return api.get("/exercise",{
            params:{
                before:before?before:null,
                after:after?after:null
            }
        })
            .then(res => res.data);
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

export function useAllWorkoutsDetails(before?:string, after?:string) {
    return useQuery({
        queryKey:["allWorkouts",UserStore.getState().user?.id],
        queryFn:async () => {
            return await getAllWorkouts(before,after);
        },
        enabled: !!currentUser?.accessToken
    })
}