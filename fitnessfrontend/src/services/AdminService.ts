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

//------------- DeleteUser -------------
export const deleteUser = async (id:number)=>{
    try{
        return api.delete("/admin",{
            params:{
                id:id
            }
        }).then(res => res.data)
    }catch (error){
        if (error instanceof Error){
            throw new Error(error.message);
        }
        throw error;
    }
}

//------------- Update user role -------------
export const updateUser = async (id:number, role:string)=>{
    try{
        return api.put(`/admin/${id}`,null,{
            params:{
                role:role
            }
        }).then(res => res.data)
    }catch (error){
        if (error instanceof Error){
            throw new Error(error.message);
        }
        throw error;
    }
}