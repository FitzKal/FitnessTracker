import api from "./AxiosConfig.ts";

//------------- GetAllUsers -------------
export const getAllUsers = async () => {
    try {
        return api.get("/admin")
            .then(res => res.data);
    }catch (error){
        if (error instanceof Error){
            throw new Error(error.message);
        }
        throw error;
    }
}

//------------- SearchUsers -------------
export const searchUsers = async (keyWord:string) => {
    try {
        return api.get("/admin/search",{
            params: {
                keyWord: keyWord
            }
        })
            .then(res => res.data);
    }catch (error){
        if (error instanceof Error){
            throw new Error(error.message);
        }
        throw error;
    }
}