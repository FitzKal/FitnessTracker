// ------------- GetProfile -------------
import api from "./AxiosConfig.ts";

export const getUserProfile = async () => {
    try {
        const res = api.get("/profile",{
        })
            .then(res => res.data);
        console.log(res);
        return res;
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}