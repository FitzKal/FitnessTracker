import type {proteinResponse} from "../../../types/CalculatorTypes.ts";

export default function FetchedProteinDetails(prop: {proteinIntake:proteinResponse}){
    return (<div>
        <div className={"flex justify-center"}>
            <h1 className={"text-2xl"}>Your calculated daily protein intake: </h1>
        </div>
        <div className={"flex flex-col mt-5"}>
            <div className={"flex flex-row justify-center gap-1"}>
                <p>Results calculated according to the <strong>American Dietetic Association (ADA): </strong></p>
                <p><strong className={"text-green-700"}>{prop.proteinIntake.dataByADA} grams/day</strong></p>
            </div>
            <div className={"flex flex-row justify-center gap-1"}>
                <p>Results calculated according to the <strong>The Centers for Disease Control and Prevention (CDC): </strong></p>
                <p><strong className={"text-green-700"}>{prop.proteinIntake.dataByCDC} grams/day</strong> (10-35% of daily caloric intake)</p>
            </div>
            <div className={"flex flex-row justify-center gap-1"}>
                <p>Results calculated according to the <strong>World Health Organization: </strong></p>
                <p><strong className={"text-green-700"}>{prop.proteinIntake.dataByWHO} grams/day</strong></p>
            </div>
        </div>
    </div>);
}