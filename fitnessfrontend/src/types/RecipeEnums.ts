export const CuisineOrigin = {
    AFRICAN: "AFRICAN",
    ASIAN: "ASIAN",
    AMERICAN: "AMERICAN",
    BRITISH: "BRITISH",
    CAJUN: "CAJUN",
    CARIBBEAN: "CARIBBEAN",
    CHINESE: "CHINESE",
    EASTERN_EUROPEAN: "EASTERN_EUROPEAN",
    EUROPEAN: "EUROPEAN",
    FRENCH: "FRENCH",
    GERMAN: "GERMAN",
    GREEK: "GREEK",
    INDIAN: "INDIAN",
    IRISH: "IRISH",
    ITALIAN: "ITALIAN",
    JAPANESE: "JAPANESE",
    JEWISH: "JEWISH",
    KOREAN: "KOREAN",
    LATIN_AMERICAN: "LATIN_AMERICAN",
    MEDITERRANEAN: "MEDITERRANEAN",
    MEXICAN: "MEXICAN",
    MIDDLE_EASTERN: "MIDDLE_EASTERN",
    NORDIC: "NORDIC",
    SOUTHERN: "SOUTHERN",
    SPANISH: "SPANISH",
    THAI: "THAI",
    VIETNAMESE: "VIETNAMESE"
} as const;

export const DietType = {
    GLUTEN_FREE: "GLUTEN_FREE",
    KETOGENIC: "KETOGENIC",
    VEGETARIAN: "VEGETARIAN",
    LACTO_VEGETARIAN: "LACTO_VEGETARIAN",
    OVO_VEGETARIAN: "OVO_VEGETARIAN",
    VEGAN: "VEGAN",
    PESCETARIAN: "PESCETARIAN",
    PALEO: "PALEO",
    PRIMAL: "PRIMAL",
    LOW_FODMAP: "LOW_FODMAP",
    WHOLE30: "WHOLE30",
} as const;

export const MealType = {
    MAIN_COURSE: "MAIN_COURSE",
    SIDE_DISH: "SIDE_DISH",
    DESSERT: "DESSERT",
    APPETIZER: "APPETIZER",
    SALAD: "SALAD",
    BREAD: "BREAD",
    BREAKFAST: "BREAKFAST",
    SOUP: "SOUP",
    BEVERAGE: "BEVERAGE",
    SAUCE: "SAUCE",
    MARINADE: "MARINADE",
    FINGERFOOD: "FINGERFOOD",
    SNACK: "SNACK",
    DRINK: "DRINK",
} as const;


export const SortType = {
    CALORIES: "CALORIES",
    HEALTHINESS: "HEALTHINESS"
} as const;

export const SortDirection = {
    asc:"ascending",
    desc:"descending"
}

export type CuisineOrigin = typeof CuisineOrigin[keyof typeof CuisineOrigin];
export type DietType = typeof DietType[keyof typeof DietType];
export type MealType = typeof MealType[keyof typeof MealType];
export type SortType = typeof SortType[keyof typeof SortType];
export type SortDirection =typeof SortDirection[keyof typeof SortDirection];
