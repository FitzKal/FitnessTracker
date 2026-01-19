import CustomCalorieForm from "./CustomCalorieForm.tsx";
import type {calorieResponse} from "../../../types/CalculatorTypes.ts";

export default function CustomCalorie(props:{handleCalorieIntakeChange:(intake:calorieResponse) => void}){

  return  (
      <div>
        <div className={"flex flex-row ml-3"}>
            <div className={"border-2 mt-2 rounded-lg p-2 bg-[#C4AD97] dark:bg-[#2F2A24] dark:border-surface-border"}>
               <CustomCalorieForm handleCalorieIntakeChange ={props.handleCalorieIntakeChange}/>
            </div>
        </div>
    </div>
  );
}