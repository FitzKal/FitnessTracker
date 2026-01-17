import { Link, Outlet } from "react-router-dom";
import {
    ArrowRightEndOnRectangleIcon,
    BoltIcon, CakeIcon,
    CalculatorIcon, CalendarDaysIcon,
    HomeIcon,
    TrophyIcon,
    UserIcon
} from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/AuthService.ts";
import { UserStore } from "../../stores/UserStore.ts";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle.tsx";

export default function NavBar() {

    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: () => logoutUser(),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["profile"], exact: false });
            UserStore.getState().stateLogout();
            toast.success("You have been successfully logged out!");
        },
        onError: (error) => {
            toast.error(error.message || "Invalid logout request");
        }
    })

    const handleLogout = async () => {
        logoutMutation.mutate();
    }

    return (
        <div className="min-h-screen">

            <div className="md:hidden top-0 w-full h-[60px] bg-[#333] z-50 flex justify-between items-center px-4 shadow-md">
                <div className="flex items-center text-white gap-2">
                    <BoltIcon className="h-8 w-8 text-[#06e6e6]" />
                    <span className="font-bold text-xl">FitnessTracker</span>
                </div>
                <ThemeToggle/>
               <Link to={"/login"}>
                   <button onClick={handleLogout} className="text-white p-2 hover:bg-red-500 rounded-full transition-colors">
                       <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                   </button>
               </Link>
            </div>

            <div className="md:hidden fixed bottom-0 w-full h-[60px] bg-[#333] z-50 flex justify-around items-center shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
                <Link to="/Fitness/home" className="flex flex-col items-center text-white hover:text-[#06e6e6] p-2">
                    <HomeIcon className="h-6 w-6" />
                    <span className="text-[10px]">Home</span>
                </Link>
                <Link to="/Fitness/Profile" className="flex flex-col items-center text-white hover:text-[#06e6e6] p-2">
                    <UserIcon className="h-6 w-6" />
                    <span className="text-[10px]">Profile</span>
                </Link>
                <Link to="/Fitness/workouts" className="flex flex-col items-center text-white hover:text-[#06e6e6] p-2">
                    <TrophyIcon className="h-6 w-6" />
                    <span className="text-[10px]">Workouts</span>
                </Link>
                <Link to="/Fitness/goals/monthlyGoals" className="flex flex-col items-center text-white hover:text-[#06e6e6] p-2">
                    <CalendarDaysIcon className="h-6 w-6" />
                    <span className="text-[10px]">Goals</span>
                </Link>
                <Link to="/Fitness/calculator/bmi" className="flex flex-col items-center text-white hover:text-[#06e6e6] p-2">
                    <CalculatorIcon className="h-6 w-6" />
                    <span className="text-[10px]">Calc</span>
                </Link>
                <Link to="/Fitness/recipes" className="flex flex-col items-center text-white hover:text-[#06e6e6] p-2">
                    <CakeIcon className="h-6 w-6" />
                    <span className="text-[10px]">Recipes</span>
                </Link>
            </div>

            <div className={`
                hidden md:block 
                fixed top-0 left-0 h-full z-50 bg-[#333] 
                w-[60px] hover:w-[250px]
                transition-[width] duration-300 ease-in-out
                shadow-[0_0_15px_rgba(0,0,0,0.5)]
                overflow-hidden group
            `}>
                <ThemeToggle/>
                <ul className="flex flex-col h-full w-full">
                    <li className="h-[70px] flex items-center pl-[10px] mb-8 border-b border-gray-700 whitespace-nowrap overflow-hidden">
                        <BoltIcon className="h-10 w-10 text-white min-w-[40px] mr-4" />
                        <span className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            FitnessTracker
                        </span>
                    </li>

                    <NavItem to="/Fitness/home" icon={<HomeIcon />} label="Home" />
                    <NavItem to="/Fitness/Profile" icon={<UserIcon />} label="Profile" />
                    <NavItem to="/Fitness/calculator/bmi" icon={<CalculatorIcon />} label="Calculators" />
                    <NavItem to="/Fitness/workouts" icon={<TrophyIcon />} label="Workout Catalog" />
                    <NavItem to="/Fitness/goals/monthlyGoals" icon={<CalendarDaysIcon />} label="Goals" />
                    <NavItem to={"/Fitness/recipes"} icon={<CakeIcon/>} label={"Recipes"} />

                    <li className="mt-auto hover:bg-red-600 transition-colors">
                        <Link
                            to="/login"
                            onClick={handleLogout}
                            className="flex items-center h-[60px] pl-[10px] text-white whitespace-nowrap overflow-hidden"
                        >
                            <ArrowRightEndOnRectangleIcon className="h-10 w-10 min-w-[40px] mr-4" />
                            <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Logout
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="pt-[60px] pb-[60px] md:pt-0 md:pb-0 md:ml-[60px] transition-all duration-300">
                <Outlet />
            </div>
        </div>
    )
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
    return (
        <li className="hover:bg-[#06e6e6] transition-colors">
            <Link to={to} className="flex items-center h-[60px] pl-[10px] text-white whitespace-nowrap overflow-hidden">
                <div className="h-10 w-10 min-w-[40px] mr-4 flex items-center justify-center">
                    <div className="h-8 w-8">{icon}</div>
                </div>

                <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {label}
                </span>
            </Link>
        </li>
    );
}