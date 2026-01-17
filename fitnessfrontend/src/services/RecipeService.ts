//------------- SearchRecipes -------------
import type {RecipeSearchRequest} from "../types/RecipeTypes.ts";
import api from "./AxiosConfig.ts";

export const searchRecipes = async (searchRequest:RecipeSearchRequest) => {
    try {
        return api.post("/recipe/search",null,{
            params:{
                query:searchRequest.query,
                number:searchRequest.number?searchRequest.number:undefined,
                cuisineOrigin:searchRequest.cuisineOrigin?searchRequest.cuisineOrigin:undefined,
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