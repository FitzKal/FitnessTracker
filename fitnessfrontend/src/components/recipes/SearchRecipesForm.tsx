import {useForm} from "react-hook-form";
import {
    type RecipeSearchRequest,
    type RecipeSearchResponse,
} from "../../types/RecipeTypes.ts";
import {CuisineOrigin, DietType, MealType, SortDirection, SortType} from "../../types/RecipeEnums.ts";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {searchRecipes} from "../../services/RecipeService.ts";
import axios from "axios";

export default function SearchRecipesForm(prop:{setAllRecipes:(response:RecipeSearchResponse) => void }){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<RecipeSearchRequest>({
        defaultValues: {
            addRecipeNutrition: false,
            sortDirection: "asc",
            number: 10
        }
    })

    const [isFiltering,setIsFiltering] = useState<boolean>(false);

    const formatLabel = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, ' ');
    };

    const searchMutation = useMutation({
        mutationFn:(request:RecipeSearchRequest) => {
            console.log(request);
            return searchRecipes(request)
        },
        onSuccess:(result) => {
            prop.setAllRecipes(result);
        },
        onError:(error) =>{
            if (axios.isAxiosError(error)){
                console.log(error.response?.data.message)
            }else {
                console.log(error.message);
            }
        }
    })

    const onSubmit = (data:RecipeSearchRequest) => {
        searchMutation.mutate(data);
    }

    return(
      <div>
              <div className={"flex justify-center"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={"flex-col flex mt-5"}>
                      <label className={"text-left"}>Search Term</label>
                      <input {...register("query")} required={true}
                             className={"w-full border-2 bg-white text-black dark:border-surface-border"} placeholder={"Pasta"}/>
                  </div>
                  <div className={"flex flex-col-reverse mt-5 lg:justify-center lg:flex-row lg:gap-x-10"}>
                      <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 mt-5 lg:mt-0 text-white font-semibold rounded-2xl shadow-md transition-colors" type={"button"}
                      onClick={() => setIsFiltering(!isFiltering)}
                      >Open extended filter</button>
                      <button disabled={isSubmitting} className="px-6 py-3 bg-green-500 hover:bg-green-600 mt-5 lg:mt-0 text-white font-semibold rounded-2xl shadow-md transition-colors" type={"submit"}>{isSubmitting?"Searching...":"Search!"}</button>
                  </div>
                  <div className={`
                                bg-slate-300 p-5 mt-5 border-2 shadow-lg border-slate-200
                                overflow-hidden transition-all duration-500 ease-in-out
                                dark:bg-surface dark:border-surface-border
                                ${isFiltering
                                                  ? "max-h-[1000px] opacity-100 translate-y-0"
                                                  : "max-h-0 opacity-0 -translate-y-4"}
                              `}>
                          <div className="flex flex-col text-left">
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
                              <div className={"grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:gap-10 mt-5 gap-y-5"}>
                                  <div className={"flex flex-col text-left"}>
                                      <label>Country of origin of the cuisine:</label>
                                      <select {...register("cuisineFromCountries")} required={false}
                                              className={"border-2 rounded-lg text-center bg-white text-black dark:border-surface-border"}>
                                          <option value={""}>---Please select a cuisine origin---</option>
                                          {
                                              Object.keys(CuisineOrigin).map((cuisine) => (
                                                  <option key={cuisine} value={cuisine}>{formatLabel(cuisine)}</option>
                                              ))
                                          }
                                      </select>
                                  </div>

                                  <div className={"flex flex-col text-left"}>
                                      <label>The type of your diet:</label>
                                      <select {...register("dietType")} required={false}
                                              className={"border-2 rounded-lg text-center bg-white text-black dark:border-surface-border"}>
                                          <option value={""}>---Please select an diet type---</option>
                                          {
                                              Object.keys(DietType).map((diet) => (
                                                  <option key={diet} value={diet}>{formatLabel(diet)}</option>
                                              ))
                                          }
                                      </select>
                                  </div>

                                  <div className={"flex flex-col text-left"}>
                                      <label>Your preferred meal type:</label>
                                      <select {...register("mealType")} required={false}
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
                                      <label className={"mt-3"}>Would you like to get additional nutrition data?</label>
                                      <input {...register("addRecipeNutrition")} type={"checkbox"}/>
                                  </div>

                                  <div className={"flex flex-col text-left"}>
                                      <label>Select preferred sorting option:</label>
                                      <select {...register("sortingOption")} required={false}
                                              className={"border-2 rounded-lg text-center bg-white text-black dark:border-surface-border"}>
                                          <option value={""}>---Please select a sorting option---</option>
                                          {
                                              Object.keys(SortType).map((sortType) => (
                                                  <option key={sortType} value={sortType}>{formatLabel(sortType)}</option>
                                              ))
                                          }
                                      </select>
                                  </div>

                                  <div className={"flex flex-col text-left"}>
                                      <label>Select preferred sorting direction:</label>
                                      <select {...register("sortDirection")} required={false}
                                              className={"border-2 rounded-lg text-center bg-white text-black dark:border-surface-border"}>
                                          <option value={""}>---Please select a sorting direction---</option>
                                          {
                                              Object.keys(SortDirection).map((sortType) => (
                                                  <option key={sortType} value={sortType}>{formatLabel(sortType)}</option>
                                              ))
                                          }
                                      </select>
                                  </div>
                              </div>
                          </div>
                  </div>
              </form>
          </div>
      </div>
    );
}