import type {User} from "../../types/User.ts";

export default function UserDetails(prop:{user:User, manageHandler:()=>void}){
    return (
        <div className={"grid grid-cols-5 gap-x-10 mb-3 border-b-2 dark:border-surface-border "}>
            <p>{prop.user.id}</p>
            <p className={"overflow-scroll"}>{prop.user.username}</p>
            <p className={"overflow-scroll"}>{prop.user.email}</p>
            <p>{prop.user.role}</p>
            <button className={"border-2 rounded-lg mb-3 bg-blue-400 hover:bg-blue-500 dark:border-surface-border " +
                "dark:bg-blue-700 dark:hover:bg-blue-800"}
            onClick={prop.manageHandler}>Manage</button>
        </div>
    )
}