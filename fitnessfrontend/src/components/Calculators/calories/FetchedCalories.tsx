import type {calorieResponse} from "../../../types/CalculatorTypes.ts";

export default function FetchedCalories(prop:{calorieIntake:calorieResponse}){
    return (
        <div className={"border-2 mt-2 rounded-lg p-2 bg-[#C4AD97]"}>
            <h1 className={"text-lg text-center"}>Your calculated calorie statistics:</h1>
            <div>
                <table className={"bg-white mt-2 h-70"}>
                    <tbody className={"border-2"}>
                    <tr className={"bg-yellow-200"}>
                        <td className={"border-r 1 px-2"}>Weight loss Classification</td>
                        <td className={"pl-1 px-2"}>Required daily calories</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Extreme weight loss</td>
                        <td className={"pl-1"}>{prop.calorieIntake.extremeWeightLossCalories}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Weight loss</td>
                        <td className={"pl-1"}>{prop.calorieIntake.weightLossCalories}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Mild Weight loss</td>
                        <td className={"pl-1"}>{prop.calorieIntake.mildWeightLossCalories}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Maintenance</td>
                        <td className={"pl-1"}>{prop.calorieIntake.maintainCalories}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Mild Weight gain</td>
                        <td className={"pl-1"}>{prop.calorieIntake.mildWeightGainCalories}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Weight gain</td>
                        <td className={"pl-1"}>{prop.calorieIntake.weightGainCalories}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Extreme Weight gain</td>
                        <td className={"pl-1"}>{prop.calorieIntake.extremeWeightGainCalories}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}