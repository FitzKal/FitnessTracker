import {useQuery} from "@tanstack/react-query";
import {getAllUsers, searchUsers} from "../../services/AdminService.ts";
import {useEffect} from "react";
import type {User} from "../../types/User.ts";
import UserDetails from "./UserDetails.tsx";
import axios from "axios";
import {toast} from "react-toastify";

export default function DisplayUsers(prop:{isSearching:boolean, keyword:string, deleteHandler:()=>void,
    handleIdToDelete:(id:number) => void, updateHandler:() => void}){

    const {data:allData, isLoading:allLoading} = useQuery({
        queryKey:["DisplayAllUsers"],
        queryFn: async () => await getAllUsers(),
        enabled:!prop.isSearching
    })

    const {data:searchedData, isLoading, error, isError} = useQuery({
        queryKey:["SearchUser",prop.keyword],
        queryFn: async () => await searchUsers(prop.keyword),
        enabled:prop.isSearching
    })


    useEffect(() => {
        if (isError && axios.isAxiosError(error)){
            console.log(error.response!.data.message)
            toast.error(error.response!.data.message)
        }else {
            console.log(error);
        }
    }, [error, isError]);

    useEffect(() => {
        console.log(searchedData)
        console.log(allData)
    }, [searchedData,allData]);


    if (isLoading || allLoading){
        return <div>
            <h2 className={"text-2xl"}>Loading...</h2>
        </div>
    }

    return(
        <div>
            <div className={"grid grid-cols-5 gap-x-10 border-b-2 dark:border-surface-border mb-5 "}>
                <label>Id</label>
                <label>Username</label>
                <label>Email</label>
                <label>Role</label>
            </div>
            {
                !prop.isSearching?
                        allData.map((user:User) => {
                            return <UserDetails user={user} manageHandler={prop.deleteHandler} handleIdToDelete={prop.handleIdToDelete}
                                                updateHandler={prop.updateHandler}/>
                        }) :
                    searchedData.map((user:User) => {
                        return <UserDetails user={user} manageHandler={prop.deleteHandler} handleIdToDelete={prop.handleIdToDelete}
                                            updateHandler={prop.updateHandler}/>
                })
            }
        </div>
    )
}