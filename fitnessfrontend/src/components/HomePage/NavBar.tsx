import {Link, Outlet} from "react-router-dom";
import {ArrowRightEndOnRectangleIcon, BoltIcon, CalculatorIcon, HomeIcon, UserIcon} from "@heroicons/react/16/solid";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logoutUser} from "../../services/AuthService.ts";
import {UserStore} from "../../stores/UserStore.ts";
import {toast} from "react-toastify";

export default function NavBar(){

    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn:() => logoutUser(),
        onSuccess:() => {
            queryClient.removeQueries({ queryKey: ["profile"], exact: false });
            UserStore.getState().stateLogout();
            toast.success("You have been successfully logged out!");
        },
        onError:(error) => {
            toast.error(error.message || "Invalid logout request");
        }
    })

    const handleLogout = async () =>{
        logoutMutation.mutate();
    }
    
    return(
        <div>
            <div className={"fixed top-0 left-0 h-full w-[40px] z-1 bg-[#333] pt-[10px] " +
                "transition:transform duration-500 ease-in-out shadow-[0_0_0_5px_rgba(0,0,0,0.5)] hover:w-[250px] "}>
                <ul className={"relative h-[97vh]"}>
                    <li className={"list-none m-[5px_0] mb-[80px] flex overflow-hidden"}>
                        <p className={"text-white text-2xl font-semibold flex"}>
                            <BoltIcon className={"h-10 w-10 flex mr-1"}/>
                            <span><strong>FitnessTracker</strong></span>
                        </p>
                    </li>

                    <li className={"list-none m-[5px_0] hover:bg-[#06e6e6] h-[50px]"}>
                        <Link to={"/Fitness/home"} className={"text-white flex relative whitespace-nowrap decoration-0 " +
                            "text-2xl"}>
                            <HomeIcon className={"h-10 w-10 flex fixed"}/>
                            <span className={"ml-11 mt-1 overflow-hidden"}>Home</span>
                        </Link>
                    </li>

                    <li className={"list-none m-[5px_0] hover:bg-[#06e6e6] mt-[10px] h-[50px]"}>
                        <Link to={"/Fitness/Profile"} className={"text-white flex relative whitespace-nowrap decoration-0 " +
                            "text-2xl"}>
                            <UserIcon className={"h-10 w-10 flex mr-1 fixed"}></UserIcon>
                            <span className={"ml-11 mt-1 overflow-hidden"}>Profile</span>
                        </Link>
                    </li>

                    <li className={"list-none m-[5px_0] hover:bg-[#06e6e6] mt-[10px] h-[50px]"}>
                        <Link to={"/Fitness/calculator/bmi"} className={"text-white flex relative whitespace-nowrap decoration-0 " +
                            "text-2xl"}>
                            <CalculatorIcon className={"h-10 w-10 flex mr-1 fixed"}></CalculatorIcon>
                            <span className={"ml-11 mt-1 overflow-hidden"}>Fitness Calculators</span>
                        </Link>
                    </li>

                    <li className={"list-none m-[5px_0] hover:bg-[#06e6e6] absolute bottom-0 w-full"}>
                        <Link to={"/login"} className={"text-white flex relative whitespace-nowrap decoration-0 " +
                            "text-2xl"} onClick={handleLogout}>
                            <ArrowRightEndOnRectangleIcon className={"h-10 w-10 flex mr-1 fixed"}/>
                            <span className={"ml-11 mt-1 overflow-hidden"}>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet/>
        </div>
    )
}