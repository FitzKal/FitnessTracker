import {Link, Outlet} from "react-router-dom";

export default function CalculatorNavBar(){
    return (
      <div>
          <div className="fixed top-0 w-full">
              <div className="bg-blue-800 text-white h-[4vh]">
                   <div className="flex justify-between ml-20">
                      <Link to={"/Fitness/calculator/bmi"}
                            className="text-xl mt-1 transition:bg-color hover:bg-blue-900 px-2 rounded-xl ml-10">
                          Calculate your bmi!
                      </Link>
                      <Link to={"/Fitness/calculator/protein"}
                            className="text-xl mt-1 transition:bg-color hover:bg-blue-900 px-2 rounded-xl ml-20">
                          Calculate optimal daily protein intake!
                      </Link>
                      <Link to={"/Fitness/calculator/calories"} className="text-xl mt-1 transition:bg-color hover:bg-blue-900 px-2 rounded-xl">
                          Calculate optimal daily protein intake!
                      </Link>
                  </div>
              </div>
          </div>
          <div >
              <Outlet/>
          </div>
      </div>
    );
}