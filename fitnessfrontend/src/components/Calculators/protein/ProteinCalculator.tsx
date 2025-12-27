import OwnProteinStats from "./OwnProteinStats.tsx";
import {useState} from "react";
import type {proteinResponse} from "../../../types/CalculatorTypes.ts";
import FetchedProteinDetails from "./FetchedProteinDetails.tsx";
import ProteinImportance from "./ProteinImportance.tsx";
import ProteinIntakeAmountImportance from "./ProteinIntakeAmountImportance.tsx";
import CustomProtein from "./CustomProtein.tsx";

export default function ProteinCalculator(){
    const [proteinIntake, setProteinIntake] = useState<proteinResponse>();
    const [isOwnProteinIntake,setIsOwnProteinIntake] = useState<boolean>(true);

    const handleProteinIntakeChange = (intake:proteinResponse)=>{
        setProteinIntake(intake);
    }
    
    return(
        <div className={"bg-gradient-to-b bg-white to-blue-300 min-h-screen"}>
            <div className={"flex justify-center"}>
                <div>
                    <h1 className={"text-4xl mt-13"}>Welcome to the Protein intake calculator!</h1>
                </div>
            </div>
                <div className={"flex justify-center mt-10"}>
                    <div className="bg-gray-300 w-full max-w-6xl mx-auto border-2 rounded-md pb-2">
                        <div className={"flex flex-row gap-12 justify-center bg-gray-400"}>
                            <button className={"transition:bg-color hover:bg-gray-500 rounded-md px-2"}
                            onClick={() =>{
                                setIsOwnProteinIntake(true);
                                setProteinIntake(undefined);
                            }}>Calculate my protein Intake</button>
                            <button className={"transition:bg-color hover:bg-gray-500 rounded-md px-2"}
                                    onClick={() => {
                                        setIsOwnProteinIntake(false)
                                        setProteinIntake(undefined);
                                    }}>Calculate custom Intake</button>
                        </div>
                        <div className={"border-b-2 bg-gray-200"}>
                            {
                                isOwnProteinIntake?
                                    <OwnProteinStats handleProteinIntakeChange ={handleProteinIntakeChange}/>
                                    :
                                    <CustomProtein handleProteinIntakeChange ={handleProteinIntakeChange}/>
                            }
                        </div>
                        <div>
                            {proteinIntake?
                                <FetchedProteinDetails proteinIntake = {proteinIntake}/>:
                            <></>}
                        </div>
                        <div className={"mt-5 mx-20"}>
                            <ProteinImportance/>
                            <br/>
                            <ProteinIntakeAmountImportance/>
                        </div>
                    </div>
                </div>
        </div>
    );
}