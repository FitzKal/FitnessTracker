import type {User} from "../../types/User.ts";
import {UserStore} from "../../stores/UserStore.ts";

export default function UserDetails(prop:{user:User, manageHandler:()=>void, handleIdToDelete:(id:number) => void, updateHandler:() => void}){
    return (
        <div className={"grid grid-cols-5 gap-x-10 mb-3 border-b-2 dark:border-surface-border "}>
            <p>{prop.user.id}</p>
            <p className={"overflow-scroll"}>{prop.user.username}</p>
            <p className={"overflow-scroll"}>{prop.user.email}</p>
            <p>{prop.user.role}</p>
                {
                    UserStore.getState().user!.username !== prop.user.username?
                        <div className={"flex flex-col lg:flex-row gap-x-5"}>
                            <button className={"border-2 rounded-lg mb-3 bg-red-400 hover:bg-red-500 dark:border-surface-border " +
                                "dark:bg-red-700 dark:hover:bg-red-800 p-1"}
                                    onClick={()=> {
                                        prop.manageHandler();
                                        prop.handleIdToDelete(prop.user.id!)
                                    }}>Delete</button>
                            <button className={"border-2 rounded-lg mb-3 bg-yellow-400 hover:bg-yellow-500 dark:border-surface-border " +
                                "dark:bg-yellow-700 dark:hover:bg-yellow-800 p-1"}
                                    onClick={() => {
                                        prop.updateHandler();
                                        prop.handleIdToDelete(prop.user.id!);
                                    }}>Update</button>
                        </div>:
                        <></>
                }
        </div>
    )
}