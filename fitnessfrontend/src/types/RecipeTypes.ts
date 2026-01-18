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

export interface RecipeSearchResponse{
    number:number,
    results:SearchResult[],
    totalResult:number
}

export interface SearchResult{
    id:number,
    image:string,
    imageType:string,
    nutrition:Nutrients,
    title:string
}

export interface Nutrients{
    nutrients:nutrientInfo[]
}

export interface nutrientInfo{
    name:string,
    amount:number,
    unit:string,
    percentOfDailyNeeds:number
}