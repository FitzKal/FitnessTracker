import {useForm} from "react-hook-form";
import type {BMIForm} from "../../../types/FormTypes.ts";
import {useState} from "react";
import OwnBMI from "./OwnBMI.tsx";
import BmiInformation from "./BmiInformation.tsx";

export default function BMICalculator(){
    const {register, handleSubmit} = useForm<BMIForm>();
    const [isOwnBMI, setOwnBMI] = useState<boolean>(true);
    const [isCustomBMI, setCustomBMI] = useState<boolean>(false);

    return(
        <div>
            <div className="flex justify-center mb-10 mt-2">
                <div>
                    <h1 className="text-4xl">Welcome to the BMI calculator!</h1>
                    <div className="mt-5">
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                className={`rounded-md px-4 py-2 ${isOwnBMI ? "bg-green-500" : "bg-green-300"} hover:bg-green-500 transition-colors`}
                                onClick={() => { setOwnBMI(true); setCustomBMI(false); }}
                            >
                                Show Own BMI
                            </button>
                            <button
                                className={`rounded-md px-4 py-2 ${isCustomBMI ? "bg-green-500" : "bg-green-300"} hover:bg-green-500 transition-colors`}
                                onClick={() => { setOwnBMI(false); setCustomBMI(true); }}
                            >
                                Calculate custom BMI
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-8 mx-10">
                <div className="border-2 mt-2 bg-green-200 rounded-md p-4 min-w-0">
                    <OwnBMI />
                </div>
                <div className="border-2 mt-2 bg-gray-200 rounded-md p-4 min-w-0">
                    <BmiInformation />
                </div>
            </div>
        </div>
    )
}