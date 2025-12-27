import CustomProteinForm from "./CustomProteinForm.tsx";
import type {proteinResponse} from "../../../types/CalculatorTypes.ts";

export default function CustomProtein(props:{handleProteinIntakeChange:(data:proteinResponse) =>void}){

    return (
        <div>
            <h1 className={"text-center text-2xl border-b-2 py-2 bg-gray-200"}>Calculate protein intake from custom input!</h1>
            <div>
                <CustomProteinForm handleProteinIntakeChange = {props.handleProteinIntakeChange}/>
            </div>
        </div>
    );
}