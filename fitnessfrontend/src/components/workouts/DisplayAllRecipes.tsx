
import type {RecipeSearchRequest} from "../../types/RecipeTypes.ts";
import {searchRecipes} from "../../services/RecipeService.ts";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function DisplayAllRecipes(){

    const searchRequest:RecipeSearchRequest = {
        query:"pasta",
        addRecipeNutrition:false,
        sortDirection:"desc"
    }
    const searchMutation = useMutation({
        mutationFn:(request:RecipeSearchRequest) => {
            console.log(request);
            return  searchRecipes(request)
        },
        onSuccess:(result) => {
            console.log(result);
        },
        onError:(error) =>{
            if (axios.isAxiosError(error)){
                console.log(error.response?.data.message)
            }else {
                console.log(error.message);
            }
        }
    })



    return (
      <div className={"flex justify-center"}>
          <button onClick={() => searchMutation.mutate(searchRequest)}>Mutate</button>
      </div>
    );
}