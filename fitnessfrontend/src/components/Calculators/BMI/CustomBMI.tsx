import type {BMIForm} from "../../../types/FormTypes.ts";
import ProgressBar from "../ProgressBar.tsx";
import CustomBMIForm from "./CustomBMIForm.tsx";
import {useState} from "react";
import {BMIClassing} from "../../../services/BMIService.ts";

export default function CustomBMI(){
    const [customBMIDetails,setCustomBMIDetails] = useState<BMIForm>({
        weight:0,
        height:0
    });
    const[customBMIScore,setCustomBMIScore] = useState<number>(0);

    const handleDetailsChange = (fetchedDetails:BMIForm) => {
        setCustomBMIDetails((prevState) => {
            prevState.height = fetchedDetails.height;
            prevState.weight = fetchedDetails.weight;
            return prevState;
        })
    }

    const handleCustomBmiScoreChange = (fetchedScore:number) =>{
        setCustomBMIScore(fetchedScore);
    }

    const bmiDetails = BMIClassing(Number(customBMIScore));
    return(
      <div>
          <div className={"text-center"}>
              <h1 className={"text-2xl"}>Calculate BMI by custom details</h1>
          </div>
         <div className={"flex justify-between flex-row mx-20"}>
             <CustomBMIForm handleCustomScore = {handleCustomBmiScoreChange} handleCustomDetails = {handleDetailsChange} customBMIDetails = {customBMIDetails}/>
             <div className={"w-[250px] mt-5"}>
                 <div className={"flex flex-row justify-between mb-2"}>
                     <p className={"text-xl"}>Your BMI score: {customBMIScore}</p>
                     <span className={"text-xl"}></span>
                 </div>
                 <ProgressBar value={customBMIScore}/>
                 <p className={"text-xl"}>Your BMI is <strong className={`${bmiDetails[0]}`}>{bmiDetails[1]}</strong></p>
             </div>
         </div>
      </div>
    );
}