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
                height:data.height,
                gender:data.gender,
                age:data.age
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

    return(
        <>
            {!isCreating ? (
                <div className="bg-gradient-to-b from-white to-blue-300 min-h-screen pt-10 px-5 mt-10">
                    <h1 className="text-2xl lg:text-4xl text-center mb-6">
                        You have not created a profile! Please create one!
                    </h1>
                    <div className="flex justify-center">
                        <button
                            className="
                                text-xl sm:text-2xl
                                px-6 sm:px-8 py-3
                                bg-green-500 hover:bg-green-600
                                text-white font-semibold
                                rounded-2xl shadow-lg
                                transition-all duration-300
                                transform hover:-translate-y-1 hover:scale-105
                                focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                                         "
                            onClick={() => setIsCreating(true)}
                        >
                            Create Profile
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center bg-gradient-to-b from-white to-blue-300 min-h-screen p-5">
                    <div className="w-full sm:w-[600px] bg-white border-2 rounded-2xl p-5 sm:p-8 shadow-md">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                            Register your user profile
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 justify-items-center">

                                <div className="flex flex-col text-left w-full max-w-xs">
                                    <label className="text-sm font-semibold mb-1">First Name</label>
                                    <input
                                        {...register("firstName")}
                                        placeholder="First name"
                                        className="p-2 border-2 rounded-lg w-full focus:border-orange-400 outline-none"
                                    />
                                    {errors.firstName && (
                                        <span className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </span>
                                    )}
                                </div>

                                <div className="flex flex-col text-left w-full max-w-xs">
                                    <label className="text-sm font-semibold mb-1">Last Name</label>
                                    <input
                                        {...register("lastName")}
                                        placeholder="Last name"
                                        className="p-2 border-2 rounded-lg w-full focus:border-orange-400 outline-none"
                                    />
                                    {errors.lastName && (
                                        <span className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </span>
                                    )}
                                </div>

                                <div className="flex flex-col text-left w-full max-w-xs">
                                    <label className="text-sm font-semibold mb-1">Height (cm)</label>
                                    <input
                                        {...register("height", { valueAsNumber: true })}
                                        type="number"
                                        placeholder="175"
                                        className="p-2 border-2 rounded-lg w-full focus:border-orange-400 outline-none"
                                    />
                                    {errors.height && (
                                        <span className="text-red-500 text-xs mt-1">
                  {errors.height.message}
                </span>
                                    )}
                                </div>

                                <div className="flex flex-col text-left w-full max-w-xs">
                                    <label className="text-sm font-semibold mb-1">Weight (kg)</label>
                                    <input
                                        {...register("weight", { valueAsNumber: true })}
                                        type="number"
                                        placeholder="70"
                                        className="p-2 border-2 rounded-lg w-full focus:border-orange-400 outline-none"
                                    />
                                    {errors.weight && (
                                        <span className="text-red-500 text-xs mt-1">
                  {errors.weight.message}
                </span>
                                    )}
                                </div>

                                <div className="flex flex-col text-left w-full max-w-xs">
                                    <label className="text-sm font-semibold mb-1">Age</label>
                                    <input
                                        {...register("age", { valueAsNumber: true })}
                                        type="number"
                                        placeholder="25"
                                        className="p-2 border-2 rounded-lg w-full focus:border-orange-400 outline-none"
                                    />
                                    {errors.age && (
                                        <span className="text-red-500 text-xs mt-1">
                  {errors.age.message}
                </span>
                                    )}
                                </div>

                                <div className="flex flex-col text-left w-full max-w-xs">
                                    <label className="text-sm font-semibold mb-1">Gender</label>
                                    <select
                                        {...register("gender", { required: true })}
                                        className="p-2 border-2 rounded-lg w-full"
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>

                                <div className="flex flex-col text-left w-full sm:col-span-2">
                                    <label className="text-sm font-semibold mb-1">Profile Picture</label>
                                    <input
                                        {...register("image")}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                  cursor-pointer border border-gray-300 rounded-lg"
                                    />
                                    {errors.image && (
                                        <span className="text-red-500 text-xs mt-1">
                  {errors.image.message as string}
                </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-lg"
                                >
                                    {isSubmitting ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}