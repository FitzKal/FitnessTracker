import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "../../services/RecipeService.ts";
import { useEffect, useState } from "react";
import type {RecipeByIdResponse } from "../../types/RecipeTypes.ts";
import axios from "axios";
import { toast } from "react-toastify";

export default function RecipeElement() {
    const { params } = useParams();
    const recipeParam = params ? String(params) : undefined;
    const splitted = recipeParam?.split("_");
    const recipeId = splitted ? splitted[0] : undefined;
    const recipeTitle = splitted ? splitted[1] : undefined;

    const [recipe, setRecipe] = useState<RecipeByIdResponse>();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["recipeId", recipeId],
        queryFn: async () => await getRecipeById(recipeId),
        enabled: !recipe,
    });
    useEffect(() => {
        if (!isLoading) setRecipe(data);
    }, [data, isLoading]);

    useEffect(() => {
        if (isError) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error("An unexpected error occurred");
            }
            console.log(error);
        }
    }, [error, isError]);

    if (isLoading) return <p className="text-center mt-10 text-xl font-semibold">Loading recipe...</p>;
    if (!recipe || recipe.length === 0) return <p className="text-center mt-10 text-xl font-semibold">No recipe found.</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white dark:bg-surface shadow-md border-b border-gray-200 dark:border-surface-border rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100">{recipeTitle || "Recipe"}</h1>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-5 text-gray-700 dark:text-gray-200">Instructions</h2>
                {recipe.map((instruction, idx) => (
                    <div key={idx} className="bg-white dark:bg-surface shadow-md rounded-xl p-6 mb-6 border border-gray-200 dark:border-surface-border">
                        <h3 className="text-xl font-bold mb-4">{instruction.name || `Instruction`}</h3>
                        {instruction.steps.map((step) => (
                            <div key={step.number} className="mb-6 p-4 border-l-4 border-orange-400 dark:border-orange-600 bg-orange-50 dark:bg-orange-900 rounded-lg">
                                <p className="font-semibold mb-2">Step {step.number}: {step.step}</p>

                                {step.ingredients && step.ingredients.length > 0 && (
                                    <div className="mb-3">
                                        <p className="font-medium mb-1 text-gray-700 dark:text-gray-300">Ingredients:</p>
                                        <div className="flex flex-wrap gap-3">
                                            {step.ingredients.map((ing) => (
                                                <div key={ing.id} className="flex flex-col items-center bg-orange-100 dark:bg-orange-700 rounded-lg p-2 w-24">
                                                    {ing.image && ing.image.includes("spoonacular") ? (
                                                        <img src={ing.image} alt={ing.name} className="h-16 w-16 object-cover rounded-md mb-1" />
                                                    ) : (
                                                       <></>
                                                    )}
                                                    <span className="text-xs text-center">{ing.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step.equipment && step.equipment.length > 0 && (
                                    <div>
                                        <p className="font-medium mb-1 text-gray-700 dark:text-gray-300">Equipment:</p>
                                        <div className="flex flex-wrap gap-3">
                                            {step.equipment.map((eq) => (
                                                <div key={eq.id} className="flex flex-col items-center bg-blue-100 dark:bg-blue-700 rounded-lg p-2 w-24">
                                                    {eq.image && eq.image.includes("spoonacular") ? (
                                                        <img src={eq.image} alt={eq.name} className="h-14 w-14 object-cover rounded-md mb-1" />
                                                    ) : (
                                                        <span className="text-xs font-semibold mb-1">{eq.name}</span>
                                                    )}
                                                    <span className="text-xs text-center">{eq.name}</span>
                                                    {eq.temperature && (
                                                        <span className="text-xs text-gray-600 dark:text-gray-300">
                                                            {eq.temperature.number} {eq.temperature.unit}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </div>
    );
}
