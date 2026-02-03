import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUser} from "../../services/AdminService.ts";
import {toast} from "react-toastify";

export default function UpdateUserForm(prop:{isManaging:boolean, updateHandler:()=>void, id:number}){
    const queryClient = useQueryClient();

    const updateRoleMutation = useMutation({
        mutationFn:(role:string) =>updateUser(prop.id,role),
        onSuccess:(result) => {
            toast.success(result);
            queryClient.invalidateQueries({queryKey:["DisplayAllUsers"],exact:false});
            queryClient.invalidateQueries({queryKey:["SearchUser"],exact:false});
            prop.updateHandler()
        },
        onError:(error) => {
            if (error instanceof Error){
                console.log(error);
            }else {
                console.log(error);
            }
        }
    })


    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
                    prop.isManaging ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={prop.updateHandler}
                aria-hidden={!prop.isManaging}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Update Profile Details"
                className={`
            fixed z-50
            left-1/2 -translate-x-1/2
            top-4 sm:top-10
            w-[95%] sm:w-auto
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            bg-white border-2 rounded-2xl p-5 sm:p-8
            dark:border-surface-border dark:bg-surface
            text-center
            transition-all duration-500 ease-out
            ${prop.isManaging
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}
            >
                <h1 className={"text-2xl lg:text-4xl"}>Update user's role</h1>
                <p className={"mt-5"}>You are about to change this user's role!</p>
                <p className={"mt-5"}>By changing this user's role, you will either grant them, or remove some privileges from them.</p>
                <div className={"flex flex-col gap-y-2 mt-2 mb-2"}>
                    <label className={"text-left"}>Choose a new role:</label>
                    <select id={"select"} className={"bg-white text-black border-2 rounded-lg text-center"}>
                        <option value={"USER"}>User</option>
                        <option value={"ADMIN"}>Admin</option>
                    </select>
                </div>
                <div className={"mt-5 flex justify-center flex-col lg:flex-row lg:gap-5"}>
                    <button className={"border-2 rounded-lg bg-gray-400 hover:bg-gray-500 dark:border-surface-border " +
                        "dark:bg-gray-700 dark:hover:bg-gray-800 p-1"}
                            onClick={prop.updateHandler}>Cancel</button>
                    <button className={"border-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 dark:border-surface-border " +
                        "dark:bg-yellow-700 dark:hover:bg-yellow-800 p-1"}
                    onClick={()=>{
                        const selectEL = document.getElementById("select") as HTMLSelectElement;
                        return updateRoleMutation.mutate(selectEL.value);
                    }}>Update</button>
                </div>
            </div>
        </>
    );
}