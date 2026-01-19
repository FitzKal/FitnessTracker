import {useState} from "react";
import BMIClassificationTable from "./BMIClassificationTable.tsx";

export default function BmiInformation() {
    const [showBmiTable, setShowBmiTable] = useState<boolean>(false);

        return (
            <div>
                {
                    showBmiTable ?
                        <BMIClassificationTable/>
                    :
                        <>
                            <div className={"text-center text-2xl"}>
                                <h1>Introduction to BMI</h1>
                            </div>
                            <div className={"mx-3 mt-5 text-lg"}>
                                <p>BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass.
                                    It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between.
                                    These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese.
                                    Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required.
                                    Refer to the table below to see the different categories based on BMI that are used by the calculator.</p>
                            </div>
                        </>
                }
                <div className={"flex justify-center mt-3"}>
                    <button className={"rounded-xl bg-gray-200 hover:bg-gray-300 text-black font-semibold transition-colors px-6 py-2"}
                    onClick={() => showBmiTable?setShowBmiTable(false):setShowBmiTable(true)}>
                        {showBmiTable ? "Show me the Bmi Information" : "Show me the bmi table"}</button>
                </div>

            </div>

        );
}