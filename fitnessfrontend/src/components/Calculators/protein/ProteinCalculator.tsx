import OwnProteinStats from "./OwnProteinStats.tsx";
import { useState } from "react";
import type { proteinResponse } from "../../../types/CalculatorTypes.ts";
import FetchedProteinDetails from "./FetchedProteinDetails.tsx";
import ProteinImportance from "./ProteinImportance.tsx";
import ProteinIntakeAmountImportance from "./ProteinIntakeAmountImportance.tsx";
import CustomProtein from "./CustomProtein.tsx";

export default function ProteinCalculator() {
    const [proteinIntake, setProteinIntake] = useState<proteinResponse>();
    const [isOwnProteinIntake, setIsOwnProteinIntake] = useState<boolean>(true);

    const handleProteinIntakeChange = (intake: proteinResponse) => {
        setProteinIntake(intake);
    };

    return (
        <div className="bg-gradient-to-b from-white to-blue-300 min-h-screen p-4 sm:p-8">
            <div className="flex justify-center">
                <h1 className="text-3xl sm:text-4xl font-semibold mt-8 text-center">
                    Welcome to the Protein Intake Calculator!
                </h1>
            </div>

            <div className="flex justify-center mt-8 sm:ml-10">
                <div className="bg-gray-300 w-full max-w-6xl mx-auto border-2 rounded-md pb-4 sm:pb-2">

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 justify-center bg-gray-400 p-4 sm:p-0 rounded-t-md">
                        <button
                            className="transition-colors hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-600 rounded-md px-4 py-2 sm:px-2 sm:py-1 font-medium"
                            onClick={() => {
                                setIsOwnProteinIntake(true);
                                setProteinIntake(undefined);
                            }}
                        >
                            Calculate My Protein Intake
                        </button>
                        <button
                            className="transition-colors hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-600 rounded-md px-4 py-2 sm:px-2 sm:py-1 font-medium"
                            onClick={() => {
                                setIsOwnProteinIntake(false);
                                setProteinIntake(undefined);
                            }}
                        >
                            Calculate Custom Intake
                        </button>
                    </div>

                    <div className="border-b-2 bg-gray-200">
                        {isOwnProteinIntake ? (
                            <OwnProteinStats handleProteinIntakeChange={handleProteinIntakeChange} />
                        ) : (
                            <CustomProtein handleProteinIntakeChange={handleProteinIntakeChange} />
                        )}
                    </div>

                    <div className="p-4">
                        {proteinIntake && <FetchedProteinDetails proteinIntake={proteinIntake} />}
                    </div>

                    <div className="mt-5 px-4 sm:px-20">
                        <ProteinImportance />
                        <div className="mt-4">
                            <ProteinIntakeAmountImportance />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
