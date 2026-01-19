import {useEffect, useState} from "react";
import type {RandomRecipeResponse, SearchResult} from "../../types/RecipeTypes.ts";
import RandomizeRecipeForm from "./RandomizeRecipeForm.tsx";
import RecipeListElement from "./RecipeListElement.tsx";


export default function DisplayRandomRecipes(){
    const [randomRecipes,setRandomRecipes] = useState<RandomRecipeResponse>();

    useEffect(() => {
        console.log(randomRecipes)
    }, [randomRecipes]);

    return(
        <div className={"min-h-screen pb-5"}>
            <div>
                <div className={"flex flex-col text-center border mt-5 p-5 border-slate-300 dark:bg-surface dark:border-surface-border shadow-md"}>
                    <h1 className={"text-2xl lg:text-4xl"}>Welcome to the Random!</h1>
                    <h2 className={"text-xl lg:text-2xl mt-5"}>Here you can get a random recipe, or recipes to try out!</h2>
                </div>
                <div>
                    <RandomizeRecipeForm setRandomRecipes={setRandomRecipes}/>
                </div>
                {
                    randomRecipes?
                        <div>
                            <div className={"mt-5 ml-5"}>
                                <p>Number of results requested: {randomRecipes?.recipes.length}</p>
                            </div>
                        </div>:
                        <></>
                }
                    <div className={"mx-10 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5"}>
                        {
                            randomRecipes?.recipes.map((recipe:SearchResult) =>{
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
    )
}