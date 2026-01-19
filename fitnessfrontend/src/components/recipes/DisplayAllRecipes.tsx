
import type {RecipeSearchResponse, SearchResult} from "../../types/RecipeTypes.ts";
import {useEffect, useState} from "react";
import SearchRecipesForm from "./SearchRecipesForm.tsx";
import RecipeListElement from "./RecipeListElement.tsx";

export default function DisplayAllRecipes(){

    const [allRecipes,setAllRecipes] = useState<RecipeSearchResponse>()

    useEffect(() => {
        console.log(allRecipes)
    }, [allRecipes]);


    return (
      <div>
         <div>
             <div className={"flex flex-col text-center border mt-5 p-5 border-slate-300 dark:bg-surface dark:border-surface-border shadow-md"}>
                 <h1 className={"text-2xl lg:text-4xl"}>Welcome to the recipe catalog!</h1>
                 <h2 className={"text-xl lg:text-2xl mt-5"}>Here you can search some recipes to try out!</h2>
             </div>
             <div>
                 <SearchRecipesForm setAllRecipes={setAllRecipes}/>
             </div>
             {
                 allRecipes?
                     <div>
                         <div className={"flex flex-col ml-5"}>
                             <p>Number of results requested: {allRecipes?.number}</p>
                             <p>Number of total results: {allRecipes?.totalResults}</p>
                         </div>
                     </div>:
                     <></>

             }
             <div className={"mx-10 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5"}>
                 {
                     allRecipes?.results.map((recipe:SearchResult) =>{
                         return (
                             <div>
                                 <RecipeListElement recipe={recipe} />
                             </div>
                         )
                     })
                 }
             </div>
         </div>
      </div>
    );
}