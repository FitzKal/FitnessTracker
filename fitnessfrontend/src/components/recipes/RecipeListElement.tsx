import { useState } from "react";
import type { nutrientInfo, SearchResult } from "../../types/RecipeTypes.ts";

export default function RecipeListElement(prop: { recipe: SearchResult }) {
    const [open, setOpen] = useState<boolean>(false);

    if (prop.recipe.nutrition){
        return (
            <div className="border border-slate-200 bg-gray-100 rounded-xl p-5 shadow-sm dark:border-surface-border dark:bg-surface">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-3">
                        <p className="text-lg font-semibold text-center lg:text-left">
                            {prop.recipe.title}
                        </p>

                        <img
                            src={prop.recipe.image}
                            alt={`Image of ${prop.recipe.title}`}
                            className="rounded-lg object-cover transition-transform duration-200 hover:scale-105"
                        />
                    </div>

                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="flex justify-between items-center dark:border-surface-border border-b pb-2 mb-3 font-semibold"
                        >
                            <span>Nutrition facts</span>
                            <span className="text-sm text-slate-500">
              {open ? "Hide" : "Show"}
            </span>
                        </button>

                        <div
                            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}
            `}
                        >
                            <div className="flex flex-col gap-2 text-sm pr-2 max-h-72 overflow-y-auto">
                                {prop.recipe.nutrition.nutrients.map(
                                    (nutrient: nutrientInfo) => (
                                        <div
                                            key={nutrient.name}
                                            className="flex justify-between items-center dark:bg-background bg-white rounded-lg px-3 py-2 shadow-sm"
                                        >
                    <span className="font-medium">
                      {nutrient.name}
                    </span>
                                            <span>
                      {nutrient.amount} {nutrient.unit}
                    </span>
                                            <span className="text-xs text-slate-500">
                      {nutrient.percentOfDailyNeeds}%
                    </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }else {
        return (
            <div className="border border-slate-200 bg-gray-100 rounded-xl p-5 shadow-sm dark:bg-surface dark:border-surface-border">
                <div>
                    <h1 className={"text-center text-lg lg:text-xl border-b-1 dark:border-surface-border"}>{prop.recipe.title}</h1>
                </div>
                <div className={"flex justify-center"}>
                    <img
                        src={prop.recipe.image}
                        alt={`Image of ${prop.recipe.title}`}
                        className="rounded-lg object-cover transition-transform duration-200 hover:scale-110"
                    />
                </div>
            </div>
        )
    }


}
