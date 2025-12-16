import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProfileSchema, type UserProfileDetails, type UserProfileFormType} from "../../types/User.ts";
import {useMutation} from "@tanstack/react-query";
import {postUserProfile} from "../../services/UserProfileService.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function CreateProfile(){
    const [isCreating,setIsCreating] = useState<boolean>(false);
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm<UserProfileFormType>({
        resolver:zodResolver(ProfileSchema)
    })

    const onSubmit = (data:UserProfileFormType) =>{
        postMutation.mutate(data);
    }

    const postMutation = useMutation({
        mutationFn: (data:UserProfileFormType) =>{
            const userData:UserProfileDetails = {
                firstName:data.firstName,
                lastName:data.lastName,
                weight: data.weight,
                height:data.height
            };
            return postUserProfile(userData, data.image[0]);
        },
        onSuccess:() =>{
            navigate("/Fitness/Profile");
            toast.success("Profile Successfully created");
        },
        onError:(error) =>{
            if(error instanceof Error){
                toast.error(error.message);
            }else {
                toast.error("Something went wrong");
                console.log((error as Error).message);
            }
        }
    })

    if (!isCreating){
        return(<div className={"text-center bg-gradient-to-b bg-white to-blue-300 min-h-screen mt-5"}>
            <h1 className={"text-4xl text-center mb-10 mt-30"}>You have not created a profile! Please create one!</h1>
            <button className={"text-2xl p-3 border-2 rounded-2xl bg-green-400 hover:bg-green-500"}
            onClick={() => setIsCreating(true)}>Create Profile</button>
        </div>)
    }else {
        return (
            <div className={"flex text-center bg-gradient-to-b bg-white to-blue-300 min-h-screen mt-5 justify-center"}>
                <div className={"w-200 h-150 bg-white border-2 rounded-2xl"}>
                    <h1 className={"text-4xl font-mono"}>Register your user profile!</h1>
                    <form className={"mt-15 p-5"} onSubmit={handleSubmit(onSubmit)}>
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
                        <div className={"justify-center"}>
                            <button className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-lg mt-40"
                            disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}