import {useMutation} from "@tanstack/react-query";
import type {RandomRecipeRequest, RandomRecipeResponse} from "../../types/RecipeTypes.ts";
import {getRandomRecipes} from "../../services/RecipeService.ts";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {MealType} from "../../types/RecipeEnums.ts";

export default function RandomizeRecipeForm(prop:{setRandomRecipes:(response:RandomRecipeResponse) => void}){

    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<RandomRecipeRequest>({
        defaultValues:{
            number:1,
            addRecipeNutrition:false,
        }
    })
    const [isFiltering,setIsFiltering] = useState<boolean>(false);

    const formatLabel = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, ' ');
    };

    const getRandomRecipeMutation = useMutation({
        mutationFn: (random:RandomRecipeRequest) => getRandomRecipes(random),
        onSuccess:(result) =>{
            prop.setRandomRecipes(result)
        },
        onError:(error) =>{
            if (axios.isAxiosError(error)){
                console.log(error.response?.data.message)
            }else {
                console.log(error.message);
            }
        }
    })

    const onSubmit = (request:RandomRecipeRequest) => {
        getRandomRecipeMutation.mutate(request);
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex flex-col-reverse mt-5 lg:justify-center lg:flex-row lg:gap-x-10"}>
                    <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 mt-5 lg:mt-0 text-white font-semibold rounded-2xl shadow-md transition-colors" type={"button"}
                            onClick={() => setIsFiltering(!isFiltering)}
                    >Open extended filter</button>
                    <button disabled={isSubmitting} className="px-6 py-3 bg-green-500 hover:bg-green-600 mt-5 lg:mt-0 text-white font-semibold rounded-2xl shadow-md transition-colors" type={"submit"}>{isSubmitting?"Randomizing...":"Randomize!"}</button>
                </div>
                <div className={` mx-20
                                bg-slate-300 p-5 mt-5 border-2 shadow-lg border-slate-200
                                overflow-hidden transition-all duration-500 ease-in-out
                                dark:bg-surface dark:border-surface-border
                                ${isFiltering
                    ? "max-h-[1000px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"}
                              `}>
                    <div className="flex flex-col text-left">
                        <div className={"grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:gap-10 mt-5 gap-y-5"}>
                            <div className={"flex flex-col text-left"}>
                                <label className="text-sm font-semibold mb-1">Number of wanted results</label>
                                <input
                                    {...register("number", { valueAsNumber: true })}
                                    type="number"
                                    placeholder="10"
                                    required={false}
                                    className="p-2 border-2 text-black bg-white rounded-lg w-full focus:border-orange-400 outline-none"
                                />
                                {errors.number && (
                                    <span className="text-red-500 text-xs mt-1">
                                    {errors.number.message}
                             </span>
                                )}
                            </div>
                            <div className={"flex flex-col text-left"}>
                                <label>Your preferred meal type:</label>
                                <select {...register("includeTags")} required={false}
                                        className={"border-2 rounded-lg text-center bg-white text-black dark:border-surface-border"}>
                                    <option value={""}>---Please select a meal type---</option>
                                    {
                                        Object.keys(MealType).map((mealType) => (
                                            <option key={mealType} value={mealType}>{formatLabel(mealType)}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className={"flex flex-row gap-3 text-left"}>
                                <label className={"mt-0 lg:mt-5"}>Would you like to get additional nutrition data?</label>
                                <input {...register("addRecipeNutrition")} type={"checkbox"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}