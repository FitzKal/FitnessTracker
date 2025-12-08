import {Link, Outlet} from "react-router-dom";
import {ArrowRightEndOnRectangleIcon, BoltIcon, HomeIcon, UserIcon} from "@heroicons/react/16/solid";

export default function NavBar(){
    
    
    return(
        <div>
            <div className={"fixed top-0 left-0 h-full w-[40px] z-1 bg-[#333] pt-[10px] " +
                "transition:transform duration-500 ease-in-out shadow-[0_0_0_5px_rgba(0,0,0,0.5)] hover:w-[250px] "}>
                <ul className={"relative h-[97vh]"}>
                    <li className={"list-none m-[5px_0] mb-[80px] flex"}>
                        <p className={"text-white text-2xl font-semibold flex"}>
                            <BoltIcon className={"h-10 w-10 flex mr-1"}/>
                            <span><strong>FitnessTracker</strong></span>
                        </p>
                    </li>

                    <li className={"list-none m-[5px_0] hover:bg-[#06e6e6] h-[50px]"}>
                        <Link to={"/Fitness/home"} className={"text-white flex relative whitespace-nowrap decoration-0 " +
                            "text-2xl"}>
                            <HomeIcon className={"h-10 w-10 flex fixed"}/>
                            <span className={"ml-11 mt-1"}>Home</span>
                        </Link>
                    </li>

                    <li className={"list-none m-[5px_0] hover:bg-[#06e6e6] mt-[10px] h-[50px]"}>
                        <Link to={"/Fitness/Profile"} className={"text-white flex relative whitespace-nowrap decoration-0 " +
                            "text-2xl"}>
                            <UserIcon className={"h-10 w-10 flex mr-1 fixed"}></UserIcon>
                            <span className={"ml-11 mt-1"}>Profile</span>
                        </Link>
                    </li>

                    <li className={"list-none m-[5px_0] hover:bg-[#06e6e6] absolute bottom-0 w-full"}>
                        <Link to={"/login"} className={"text-white flex relative whitespace-nowrap decoration-0 " +
                            "text-2xl"}>
                            <ArrowRightEndOnRectangleIcon className={"h-10 w-10 flex mr-1 fixed"}/>
                            <span className={"ml-11 mt-1"}>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet/>
        </div>
    )
}