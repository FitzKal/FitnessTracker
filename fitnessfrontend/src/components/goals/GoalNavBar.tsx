import {Link, Outlet} from "react-router-dom";

export default function GoalNavBar(){
    return (
        <div>
            <div className="lg:fixed sm:relative top-0 w-full bg-red-800 text-white h-[6vh] flex items-center justify-center shadow-md">
                <div className="flex flex-wrap justify-center gap-6">
                    <Link
                        to="/Fitness/goals/monthlyGoals"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-red-900 transition-colors"
                    >
                        All monthly goals
                    </Link>
                    <Link
                        to="/Fitness/goals/weeklyGoals"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-red-900 transition-colors"
                    >
                        All weekly goals
                    </Link>
                    <Link
                        to="/Fitness/calculator/calories"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-red-900 transition-colors"
                    >
                        All monthly goals
                    </Link>
                </div>
            </div>

            <div className="pt-[8vh]">
                <Outlet />
            </div>
        </div>
    );
}