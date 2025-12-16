import {useForm} from "react-hook-form";
import {ProfileSchema, type UserProfile, type UserProfileFormType, type UserProfileDetails} from "../../types/User.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUserProfile} from "../../services/UserProfileService.ts";
import {toast} from "react-toastify";
import {useEffect} from "react";


export default function UpdateForm(prop:{isUpdating:boolean, updateHandler:()=>void, userData:UserProfile}){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<UserProfileFormType>({
        resolver:zodResolver(ProfileSchema),
        defaultValues:{
            height:prop.userData.height,
            weight: prop.userData.weight,
            firstName: prop.userData.firstName,
            lastName: prop.userData.lastName
        }
    })

    const onSubmit = async (data:UserProfileFormType) => {
        updateMutation.mutate(data);
    }

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (data:UserProfileFormType) => {
            const newProfile:UserProfileDetails = {
                weight:data.weight,
                height:data.height,
                lastName:data.lastName,
                firstName:data.firstName
            };
            return updateUserProfile(newProfile,data.image[0]);
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey:["profile"]});
            toast.success("Your profile was successfully updated!");
            prop.updateHandler();
        },
        onError:(error) => {
          if (error instanceof Error){
              toast.error(error.message);
          }else{
              toast.error("Something went wrong");
          }
        }
    })

    useEffect(() => {
        console.log(prop.userData);
    }, []);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
                    prop.isUpdating ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={prop.updateHandler}
                aria-hidden={prop.isUpdating ? 'false' : 'true'}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Update Profile Details"
                className={`
        text-center bg-white h-120 w-200 border-2 rounded-2xl p-5
        fixed left-1/2 -translate-x-1/2 top-6 z-50
        transition-transform opacity duration-500 ease-out will-change-transform
        ${prop.isUpdating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
      `}
            >
                <h1 className="text-3xl">Update Profile Details</h1>
                <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className={"flex flex-wrap justify-center gap-x-10 gap-y-8"}>

                        <div className={"flex flex-col text-left relative"}>
                            <label className="text-sm font-semibold ml-1 mb-1">First Name</label>
                            <input {...register("firstName")} placeholder={"First name"}
                                   className={"p-2 border-2 rounded-lg w-64 focus:border-orange-400 outline-none"} />
                            {errors.firstName && (
                                <div className={"text-red-500 text-xs mt-1 absolute top-full left-0 whitespace-nowrap"}>
                                    {errors.firstName.message}
                                </div>
                            )}
                        </div>

                        <div className={"flex flex-col text-left relative"}>
                            <label className="text-sm font-semibold ml-1 mb-1">Last Name</label>
                            <input {...register("lastName")} placeholder={"Last name"}
                                   className={"p-2 border-2 rounded-lg w-64 focus:border-orange-400 outline-none"} />
                            {errors.lastName && (
                                <div className={"text-red-500 text-xs mt-1 absolute top-full left-0 whitespace-nowrap"}>
                                    {errors.lastName.message}
                                </div>
                            )}
                        </div>

                        <div className={"flex flex-col text-left relative"}>
                            <label className="text-sm font-semibold ml-1 mb-1">Height (cm)</label>
                            <input {...register("height", { valueAsNumber: true })} type="number" placeholder={"175"}
                                   className={"p-2 border-2 rounded-lg w-64 focus:border-orange-400 outline-none"} />
                            {errors.height && (
                                <div className={"text-red-500 text-xs mt-1 absolute top-full left-0 whitespace-nowrap"}>
                                    {errors.height.message}
                                </div>
                            )}
                        </div>

                        <div className={"flex flex-col text-left relative"}>
                            <label className="text-sm font-semibold ml-1 mb-1">Weight (kg)</label>
                            <input {...register("weight", { valueAsNumber: true })} type="number" placeholder={"70"}
                                   className={"p-2 border-2 rounded-lg w-64 focus:border-orange-400 outline-none"} />
                            {errors.weight && (
                                <div className={"text-red-500 text-xs mt-1 absolute top-full left-0 whitespace-nowrap"}>
                                    {errors.weight.message}
                                </div>
                            )}
                        </div>

                        <div className={"flex flex-col w-full max-w-xl text-left relative"}>
                            <label className={"text-sm font-semibold ml-1 mb-1"}>Profile Picture</label>
                            <div>
                                <input {...register("image")} type={"file"}
                                       className="block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-full file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-violet-50 file:text-violet-700
                                       hover:file:bg-violet-100
                                       cursor-pointer border border-gray-300 rounded-lg"
                                       accept={"image/jpeg,image/jpg,image/png,image/webp"}/>
                                {errors.image && (
                                    <div className={"text-red-500 text-xs mt-1 absolute top-full left-0 whitespace-nowrap"}>
                                        {errors.image.message as string}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-15 justify-center gap-6">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition-colors"
                            onClick={prop.updateHandler}
                        >
                            Cancel
                        </button>
                        <button type="button" className="px-6 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 font-semibold transition-colors">
                            Change Password
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-lg"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}