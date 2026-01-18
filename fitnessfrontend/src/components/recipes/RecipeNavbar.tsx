import {Link, Outlet} from "react-router-dom";

export default function RecipeNavbar(){
    return (
        <div>
            <div className="relative lg:fixed top-0 w-full bg-green-800 dark:bg-green-900 text-white lg:h-[6vh] flex items-center justify-center shadow-md">
                <div className="flex flex-wrap justify-center gap-6">
                    <Link
                        to="/Fitness/recipes/search"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-green-900 dark:hover:bg-green-950 transition-colors"
                    >
                        Search Recipes
                    </Link>
                    <Link
                        to="/Fitness/recipes/random"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-green-900 dark:hover:bg-green-950   transition-colors"
                    >
                        Get Random recipes
                    </Link>
                </div>
            </div>

            <div className="pt-[6vh]">
                <Outlet />
            </div>
        </div>
    );
}