import {CuisineOrigin, DietType, MealType, SortDirection, SortType} from "./RecipeEnums.ts";

export interface RecipeSearchResponse{
    number:number,
    results:SearchResult[],
    totalResults:number
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


export interface RecipeSearchRequest{
    query:string,
    number?:number,
    cuisineFromCountries?: CuisineOrigin,
    dietType?:DietType,
    mealType?:MealType,
    addRecipeNutrition:boolean,
    sortingOption?:SortType,
    sortDirection:SortDirection
}

export type RandomRecipeRequest = {
    number?:number,
    addRecipeNutrition?:boolean,
    includeTags?:MealType
}
export interface RandomRecipeResponse {
    recipes:SearchResult[]
}

///By Id
export type RecipeByIdResponse = Instructions[]

export interface Instructions{
    name:string,
    steps:Step[]
}

export interface Step{
    step:string,
    number:number,
    equipment?:CookingEquipment[],
    ingredients?:Ingredients[]
}

export interface CookingEquipment{
    id:number,
    image:string,
    name:string
    temperature?:Temperature
}

export interface Temperature{
    number:number,
    unit:string
}

export interface Ingredients{
    id:number,
    image:string,
    name:string
}