
import type {RecipeSearchResponse} from "../../types/RecipeTypes.ts";
import {useEffect, useState} from "react";
import SearchRecipesForm from "./SearchRecipesForm.tsx";

export default function DisplayAllRecipes(){

    const [allRecipes,setAllRecipes] = useState<RecipeSearchResponse>()

    useEffect(() => {
        console.log(allRecipes)
    }, [allRecipes]);


    return (
      <div className={"min-h-screen "}>
         <div>
             <div className={"flex flex-col text-center border mt-5 p-5 border-slate-300 dark:bg-surface dark:border-surface-border shadow-md"}>
                 <h1 className={"text-2xl lg:text-4xl"}>Welcome to the recipe catalog!</h1>
                 <h2 className={"text-xl lg:text-2xl mt-5"}>Here you can search some recipes to try out!</h2>
             </div>
             <div>
                 <SearchRecipesForm setAllRecipes={setAllRecipes}/>
             </div>
             <div className={"mt-10"}>

             </div>
         </div>
      </div>
    );
}