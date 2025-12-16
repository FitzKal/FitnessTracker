import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteUserProfile} from "../../services/UserProfileService.ts";
import {toast} from "react-toastify";

export default function DeleteProfileForm(prop:{isDeleting:boolean, deleteHandler: () => void}){
    const queryClient = useQueryClient();

    const permanentDeleteHandler = () =>{
        deleteMutation.mutate();
    }

    const deleteMutation = useMutation({
        mutationFn: () => deleteUserProfile(),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["profile"]});
            toast.success("Your profile has been successfully removed");
        },
        onError:(error) => {
            if (error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Something went wrong");
            }
        }
    })

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
                    prop.isDeleting ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={prop.deleteHandler}
                aria-hidden={prop.isDeleting ? 'false' : 'true'}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Update Profile Details"
                className={`
        text-center bg-white h-120 w-200 border-2 rounded-2xl p-5
        fixed left-1/2 -translate-x-1/2 top-6 z-50
        transition-transform opacity duration-500 ease-out will-change-transform
        ${prop.isDeleting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
      `}
            >
                <h1 className={"text-4xl mb-10"}>Confirm profile deletion</h1>
                <p className={"text-2xl mb-10"}>Are you sure that you want to delete your profile <strong className={"font-bold text-red-500"}>permanently</strong>?</p>
                <p className={"text-xl"}>Deleting your profile will result in the complete removal of <strong className={"font-bold text-red-500"}>all of your workout data</strong>,
                    as well as <strong className={"font-bold text-red-500"}>all of your personal data</strong>!</p>
                <div className="flex flex-row mt-25 justify-between mx-40">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition-colors"
                        onClick={prop.deleteHandler}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-700 text-white font-bold transition-colors shadow-lg"
                        onClick={permanentDeleteHandler}
                    >
                        Delete profile permanently
                    </button>
                </div>
            </div>
            </>
                );
}