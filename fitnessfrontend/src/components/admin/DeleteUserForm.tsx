import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteUser} from "../../services/AdminService.ts";
import {toast} from "react-toastify";

export default function DeleteUserForm(prop:{isManaging:boolean, deleteHandler:()=>void, id:number}){
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn:(id:number) => deleteUser(id),
        onSuccess:(result) => {
            toast.success(result);
            queryClient.invalidateQueries({queryKey:["DisplayAllUsers"],exact:false});
            queryClient.invalidateQueries({queryKey:["SearchUser"],exact:false});
            prop.deleteHandler()
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
                onClick={prop.deleteHandler}
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
                <h1 className={"text-2xl lg:text-4xl"}>Confirm deleting user?</h1>
                <p className={"mt-5"}>By Deleting this user, you will delete all of their personal data, including goals, and profile!</p>
                <div className={"mt-5 flex justify-center flex-col lg:flex-row lg:gap-5"}>
                    <button className={"border-2 rounded-lg bg-gray-400 hover:bg-gray-500 dark:border-surface-border " +
                        "dark:bg-gray-700 dark:hover:bg-gray-800 p-1"}
                    onClick={prop.deleteHandler}>Cancel</button>
                    <button className={"border-2 rounded-lg bg-red-400 hover:bg-red-500 dark:border-surface-border " +
                        "dark:bg-red-700 dark:hover:bg-red-800 p-1"}
                    onClick={() => deleteMutation.mutate(prop.id)}>Confirm delete</button>
                </div>
            </div>
        </>
    );
}