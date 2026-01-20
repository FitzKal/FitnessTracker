import {useForm} from "react-hook-form";
import {ProfileSchema, type UserProfile, type UserProfileFormType, type UserProfileDetails} from "../../types/User.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUserProfile} from "../../services/UserProfileService.ts";
import {toast} from "react-toastify";
import {useEffect} from "react";


export default function UpdateForm(prop:{isUpdating:boolean, updateHandler:()=>void, userData:UserProfile
    , handlePasswordChanging: () => void }){
    const {register,handleSubmit,formState:{errors,isSubmitting},reset} = useForm<UserProfileFormType>({
        resolver:zodResolver(ProfileSchema),
        defaultValues:{
            height:prop.userData.height,
            weight: prop.userData.weight,
            firstName: prop.userData.firstName,
            lastName: prop.userData.lastName,
            gender: prop.userData.gender
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
                firstName:data.firstName,
                gender:data.gender,
                age:data.age
            };
            console.log(updateMutation);
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
        reset({
            height: prop.userData.height?prop.userData.height * 100 : prop.userData.height,
            weight: prop.userData.weight,
            firstName: prop.userData.firstName,
            lastName: prop.userData.lastName,
            image: undefined as never,
            age: prop.userData.age
        });
    }, [prop.userData, reset]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
                    prop.isUpdating ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={prop.updateHandler}
                aria-hidden={!prop.isUpdating}
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
            max-w-4xl
            max-h-[90vh]
            overflow-y-auto
            bg-white dark:bg-surface dark:border-surface-border border-2 rounded-2xl
            p-5 sm:p-8
            text-center
            transition-all duration-500 ease-out
            ${prop.isUpdating
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}
            >
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Update Profile Details
                </h1>

                <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div
                        className="
                    grid grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-x-8 gap-y-6
                    justify-items-center
                "
                    >
                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold mb-1">First Name</label>
                            <input
                                {...register("firstName")}
                                className="p-2 border-2 rounded-lg bg-white text-black focus:border-orange-400 outline-none"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold mb-1">Last Name</label>
                            <input
                                {...register("lastName")}
                                className="p-2 border-2 rounded-lg bg-white text-black focus:border-orange-400 outline-none"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold mb-1">Height (cm)</label>
                            <input
                                type="number"
                                {...register("height", { valueAsNumber: true })}
                                className="p-2 border-2 rounded-lg bg-white text-black focus:border-orange-400 outline-none"
                            />
                            {errors.height && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.height.message}
                                </p>
                            )}
                        </div>

                        {/* Weight */}
                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                {...register("weight", { valueAsNumber: true })}
                                className="p-2 border-2 rounded-lg bg-white text-black focus:border-orange-400 outline-none"
                            />
                            {errors.weight && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.weight.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold mb-1">Age</label>
                            <input
                                type="number"
                                {...register("age", { valueAsNumber: true })}
                                className="p-2 border-2 rounded-lg bg-white text-black focus:border-orange-400 outline-none"
                            />
                            {errors.age && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.age.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col text-left relative w-full max-w-xs">
                            <label className="text-sm font-semibold mb-1">Gender</label>
                            <select
                                {...register("gender")}
                                className="border-2 h-10 rounded-lg px-2 bg-white text-black"
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>

                        <div className="flex flex-col text-left relative w-full sm:col-span-2 lg:col-span-3">
                            <label className="text-sm font-semibold mb-1">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                {...register("image")}
                                accept="image/jpeg,image/png,image/webp"
                                className="
                            block w-full text-sm
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            bg-white text-black
                            border border-gray-300 rounded-lg
                        "
                            />
                            {errors.image && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.image.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <button
                            type="button"
                            onClick={prop.updateHandler}
                            className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-gray-300 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="px-6 py-2 rounded-xl bg-yellow-300 dark:bg-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-800 font-semibold"
                            onClick={() => {
                                prop.updateHandler()
                                prop.handlePasswordChanging()
                            }}>
                            Change Password
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-xl dark:bg-green-600 dark:hover:bg-green-800 bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}