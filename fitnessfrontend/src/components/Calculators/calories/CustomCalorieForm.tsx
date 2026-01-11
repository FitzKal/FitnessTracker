import {useForm} from "react-hook-form";
import {type calorieResponse, type IntakeRequest, IntakeSchema} from "../../../types/CalculatorTypes.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {calculateCustomCalorieIntake} from "../../../services/CalculatorService.ts";
import {toast} from "react-toastify";

export default function CustomCalorieForm(props:{handleCalorieIntakeChange:(intake:calorieResponse) => void}){
    const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm<IntakeRequest>({
        resolver:zodResolver(IntakeSchema)
    })

    const customCalorieMutation = useMutation({
        mutationFn:(intake:IntakeRequest) => calculateCustomCalorieIntake(intake),
        onSuccess:(result) =>{
            props.handleCalorieIntakeChange(result);
        },
        onError:(error) => {
            console.log(error.message);
            toast.error(error.message);
        }
    })

    const onSubmit = (intake:IntakeRequest)=> {
        customCalorieMutation.mutate(intake)
    }

    return(
       <div>
           {
               isSubmitting?
                   <div>Loading...</div>:
                   <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                           <div className="flex flex-col">
                               <label className="mb-1">Height</label>
                               <input
                                   {...register("height",{ valueAsNumber: true })}
                                   type="number"
                                   required
                                   className="border-2 rounded-lg focus:border-orange-400 outline-none bg-white px-2 py-1"
                                   placeholder="171"
                               />
                               <div className="text-red-500 text-xs mt-1 h-4">
                                   {errors.height ? errors.height.message : "\u00A0"}
                               </div>
                           </div>

                           <div className="flex flex-col">
                               <label className="mb-1">Weight</label>
                               <input
                                   {...register("weight",{ valueAsNumber: true })}
                                   type="number"
                                   required
                                   className="border-2 rounded-lg focus:border-orange-400 outline-none bg-white px-2 py-1"
                                   placeholder="71"
                               />
                               <div className="text-red-500 text-xs mt-1 h-4">
                                   {errors.weight ? errors.weight.message : "\u00A0"}
                               </div>
                           </div>

                           <div className="flex flex-col">
                               <label className="mb-1">Age</label>
                               <input
                                   {...register("age",{ valueAsNumber: true })}
                                   type="number"
                                   required
                                   className="border-2 rounded-lg focus:border-orange-400 outline-none bg-white px-2 py-1"
                                   placeholder="21"
                               />
                               <div className="text-red-500 text-xs mt-1 h-4">
                                   {errors.age ? errors.age.message : "\u00A0"}
                               </div>
                           </div>

                           <div className="flex flex-col">
                               <label className="mb-1">Gender</label>
                               <select
                                   {...register("gender", { required: true })}
                                   className="bg-white border-2 h-8 rounded-lg"
                               >
                                   <option value="MALE">Male</option>
                                   <option value="FEMALE">Female</option>
                               </select>
                               <div className="text-red-500 text-xs mt-1 h-4">
                                   {errors.gender ? errors.gender.message : "\u00A0"}
                               </div>
                           </div>

                           <div className="flex flex-col sm:col-span-2 lg:col-span-3">
                               <label className="mb-1">Select your activity level:</label>
                               <select
                                   {...register("exerciseTypeCalc")}
                                   className="bg-white border-2 h-8 rounded-lg"
                                   id="ExType"
                               >
                                   <option value="SEDENTARY">Sedentary: Little to no exercise</option>
                                   <option value="LIGHT">Light: Exercise 1-3 times a week</option>
                                   <option value="MODERATE">Moderate: Exercise 4-5 times a week</option>
                                   <option value="ACTIVE">Active: Daily exercise, or intense exercise at least 3 times a week</option>
                                   <option value="VERY_ACTIVE">Very Active: Intense exercise 6-7 times a week</option>
                                   <option value="EXTRA_ACTIVE">Extra Active: Intense exercise daily or physical job</option>
                               </select>
                               <div className="text-red-500 text-xs mt-1 h-4">
                                   {errors.exerciseTypeCalc ? errors.exerciseTypeCalc.message : "\u00A0"}
                               </div>
                           </div>
                       </div>

                       <div className="flex justify-center">
                           <button
                               type="submit"
                               className="hover:bg-blue-400 rounded-md px-3 py-2 mb-2 border-2 bg-blue-300 mt-6"
                           >
                               Calculate daily calorie intake!
                           </button>
                       </div>
                   </form>
           }
       </div>
    );
}