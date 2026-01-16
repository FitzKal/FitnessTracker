import { Link, Outlet } from "react-router-dom";

export default function CalculatorNavBar() {
    return (
        <div>
            <div className="relative lg:fixed top-0 w-full bg-blue-800 dark:bg-blue-900 text-white lg:h-[6vh] flex items-center justify-center shadow-md">
                <div className="flex flex-wrap justify-center gap-6">
                    <Link
                        to="/Fitness/calculator/bmi"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        Calculate BMI
                    </Link>
                    <Link
                        to="/Fitness/calculator/protein"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        Daily Protein Intake
                    </Link>
                    <Link
                        to="/Fitness/calculator/calories"
                        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        Daily Calorie Intake
                    </Link>
                </div>
            </div>

            <div className="pt-[6vh]">
                <Outlet />
            </div>
        </div>
    );
}
