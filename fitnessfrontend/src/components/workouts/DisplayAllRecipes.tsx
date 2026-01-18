
import type {RecipeSearchRequest, RecipeSearchResponse} from "../../types/RecipeTypes.ts";
import {searchRecipes} from "../../services/RecipeService.ts";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useState} from "react";

export default function DisplayAllRecipes(){

    const [allRecipes,SetAllRecipes] = useState<RecipeSearchResponse>()

    const searchRequest:RecipeSearchRequest = {
        query:"pasta",
        addRecipeNutrition:true,
        sortDirection:"desc"
    }
    const searchMutation = useMutation({
        mutationFn:(request:RecipeSearchRequest) => {
            console.log(request);
            return  searchRecipes(request)
        },
        onSuccess:(result) => {
            SetAllRecipes(result);
        },
        onError:(error) =>{
            if (axios.isAxiosError(error)){
                console.log(error.response?.data.message)
            }else {
                console.log(error.message);
            }
        }
    })

    useEffect(() => {
        console.log(allRecipes)
    }, [allRecipes]);


    return (
      <div className={"flex justify-center"}>
          <button onClick={() => searchMutation.mutate(searchRequest)}>Mutate</button>
      </div>
    );
}