import type {BMIForm} from "../../../types/FormTypes.ts";

export default function CustomSubmittedBMI(prop:{customBMIDetails:BMIForm}){
    return(
        <div>
            <div className={"text-xl my-5"}>
                <p>According to your personal statistics:</p>
                <p>Your height is: {prop.customBMIDetails.height} m</p>
                <p>Your weight is: {prop.customBMIDetails.weight} kg</p>
            </div>
        </div>
    );
}