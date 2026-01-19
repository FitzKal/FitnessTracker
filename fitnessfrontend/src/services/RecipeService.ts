import type {RandomRecipeRequest, RecipeSearchRequest} from "../types/RecipeTypes.ts";
import api from "./AxiosConfig.ts";

//------------- SearchRecipes -------------
export const searchRecipes = async (searchRequest:RecipeSearchRequest) => {
    try {
        return api.post("/recipe/search",null,{
            params:{
                query:searchRequest.query,
                number:searchRequest.number?searchRequest.number:undefined,
                cuisineFromCountries:searchRequest.cuisineFromCountries?searchRequest.cuisineFromCountries:undefined,
                dietType:searchRequest.dietType?searchRequest.dietType:undefined,
                mealType:searchRequest.mealType?searchRequest.mealType:undefined,
                addRecipeNutrition:searchRequest.addRecipeNutrition,
                sortingOption:searchRequest.sortingOption,
                sortDirection:searchRequest.sortDirection
            }
        }).then(res => res.data);
    } catch (error){
        if (error instanceof Error){
            console.log(error);
            throw new Error(error.message);
        }else {
            throw error;
        }
    }
}

//------------- GetRandomRecipes -------------
export const getRandomRecipes = async (randomRequest:RandomRecipeRequest) => {
    try {
        return api.post("/recipe/random",null,{
           params:{
               number:randomRequest.number?randomRequest.number:undefined,
               addRecipeNutrition:randomRequest.addRecipeNutrition,
               includeTags:randomRequest.includeTags
           }
        }).then(res => res.data);
    } catch (error){
        if (error instanceof Error){
            console.log(error);
            throw new Error(error.message);
        }else {
            throw error;
        }
    }
}