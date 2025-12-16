import {useForm} from "react-hook-form";
import {UpdateSchema, type UserProfile, type UserUpdate, type UserUpdateRequest} from "../../types/User.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUserProfile} from "../../services/UserProfileService.ts";
import {toast} from "react-toastify";


export default function UpdateForm(prop:{isUpdating:boolean, updateHandler:()=>void, userData:UserProfile}){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<UserUpdate>({
        resolver:zodResolver(UpdateSchema),
        defaultValues:{
            height:prop.userData.height,
            weight: prop.userData.weight,
            firstName: prop.userData.firstName,
            lastName: prop.userData.lastName
        }
    })

    const onSubmit = async (data:UserUpdate) => {
        updateMutation.mutate(data);
    }

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (data:UserUpdate) => {
            const newProfile:UserUpdateRequest = {
                weight:data.weight,
                height:data.height,
                lastName:data.lastName,
                firstName:data.firstName
            };
            console.log(data.image[0]);
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
                <form className="mt-15" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row flex-wrap justify-between gap-10">
                        <div className="flex flex-col">
                            <input {...register('firstName')} placeholder="First name" className="p-1 border-2 rounded-md" />
                            {errors.firstName && <div className="text-red-500">{errors.firstName.message}</div>}
                        </div>

                        <div className="flex flex-col">
                            <input {...register('lastName')} placeholder="Last name" className="p-1 border-2 rounded-md" />
                            {errors.lastName && <div className="text-red-500">{errors.lastName.message}</div>}
                        </div>

                        <div className="flex flex-col">
                            <input {...register('height',{valueAsNumber:true})} type={"number"} placeholder="Height (in cm)" className="p-1 border-2 rounded-md" />
                            {errors.height && <div className="text-red-500">{errors.height.message}</div>}
                        </div>

                        <div className="flex flex-col">
                            <input {...register('weight',{valueAsNumber:true})} type={"number"} placeholder="Weight (in Kg)" className="p-1 border-2 rounded-md" />
                            {errors.weight && <div className="text-red-500">{errors.weight.message}</div>}
                        </div>

                        <div className="flex flex-row gap-1">
                            <label className="mt-1">Choose a profile picture</label>
                            <div>
                                <input
                                    {...register('image',{required:false})}
                                    type="file"
                                    className="border border-gray-300 rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:border-r file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row mt-10 justify-center gap-6">
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