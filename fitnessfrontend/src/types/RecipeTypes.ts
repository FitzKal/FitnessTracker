import type {CuisineOrigin, DietType, MealType, SortDirection, SortType} from "./RecipeEnums.ts";

export interface RecipeSearchRequest{
    query:string,
    number?:number,
    cuisineOrigin?: CuisineOrigin,
    dietType?:DietType,
    mealType?:MealType,
    addRecipeNutrition:boolean,
    sortingOption?:SortType,
    sortDirection:SortDirection
}
