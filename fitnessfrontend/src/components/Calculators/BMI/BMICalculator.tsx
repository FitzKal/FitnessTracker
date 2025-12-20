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
            <div className={"flex justify-center mb-10 mt-2"}>
                <div>
                    <h1 className={"text-4xl"}>Welcome to the BMI calculator!</h1>
                    <div>
                        <ul>
                            <div className={"flex flex-row start gap-3 mt-5"}>
                                <li className={"list-none"}>
                                    <button className={`w-50 h-10 rounded-md ${isOwnBMI? "bg-green-500" : "bg-green-300"} hover:bg-green-500`}
                                            onClick={() => {setOwnBMI(true); setCustomBMI(false)}}>Own</button>
                                </li>
                                <li>
                                    <button className={`w-50 h-10 rounded-md ${isCustomBMI? "bg-green-500" : "bg-green-300"} hover:bg-green-500`}
                                            onClick={() => {setOwnBMI(false); setCustomBMI(true)}}>Calculate custom BMI</button>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div >
            </div>
            <div className={"flex flex-row mx-20 gap-40"}>
                <div className={"h-100 w-250 border-2 mt-2 bg-green-200"}>
                    <OwnBMI/>
                </div>
                <div className={"h-100 w-250 border-2 mt-2 bg-gray-200"}>
                    <BmiInformation/>
                </div>
            </div>
        </div>
    )
}