    import type {BMIForm} from "../../../types/FormTypes.ts";
import ProgressBar from "../ProgressBar.tsx";
import CustomBMIForm from "./CustomBMIForm.tsx";
import {useState} from "react";
import {BMIClassing} from "../../../services/CalculatorService.ts";
    import CustomSubmittedBMI from "./CustomSubmittedBMI.tsx";
    import BmiClassificationText from "./BmiClassificationText.tsx";

export default function CustomBMI(){
    const [customBMIDetails,setCustomBMIDetails] = useState<BMIForm>({
        weight:0,
        height:0
    });
    const [customBMIScore,setCustomBMIScore] = useState<number>(0);
    const [submittedShowing,setSubmittedShowing] = useState<boolean>(false);

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

    const handleSubmittedShowing = () => {
        if(submittedShowing){
            setSubmittedShowing(false)
        }else {
            setSubmittedShowing(true)
        }
    }

    const bmiDetails = BMIClassing(Number(customBMIScore));
    return(
      <div>
          <div className={"text-center"}>
              <h1 className={"text-2xl"}>Calculate BMI by custom details</h1>
          </div>
         <div className={"flex justify-between flex-row mx-20 sm:mx-10"}>
             {!submittedShowing?
                 <CustomBMIForm handleCustomScore = {handleCustomBmiScoreChange} handleCustomDetails = {handleDetailsChange} customBMIDetails = {customBMIDetails}
                                handleSubmittedShowing={handleSubmittedShowing} />
             :
             <CustomSubmittedBMI customBMIDetails={customBMIDetails} />}
             <div className={"w-[250px] mt-5"}>
                 <div className={"flex flex-row justify-between mb-2"}>
                     <p className={"text-xl"}>Your BMI score: {customBMIScore}</p>
                     <span className={"text-xl"}></span>
                 </div>
                 <ProgressBar value={customBMIScore}/>
                 <p className={"text-xl"}>Your BMI is <strong className={`${bmiDetails[0]}`}>{bmiDetails[1]}</strong></p>
             </div>
         </div>
          {
              submittedShowing?
                 <>
                     <BmiClassificationText classification ={bmiDetails[1]}/>
                     <div className={"py-10 flex justify-center"}>
                         <button className={"rounded-xl bg-red-400 hover:bg-red-500 font-semibold transition-colors px-6 py-2"}
                                 onClick={() => {
                                     setCustomBMIScore(0);
                                     setCustomBMIDetails({weight:0, height:0});
                                     setSubmittedShowing(false);
                                 }}>Reset calculator</button>
                     </div>
                 </>
                  :
                  <></>
          }
      </div>
    );
}