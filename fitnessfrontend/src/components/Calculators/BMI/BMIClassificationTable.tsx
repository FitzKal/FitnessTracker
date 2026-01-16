export default function BMIClassificationTable(){
    return(
        <div className={"flex flex-col justify-center"}>
            <div className={"flex justify-center mb-5"}>
                <h1 className={"text-2xl"}>BMI classification table for adults</h1>
            </div>
            <div className={"flex justify-center text-black "}>
                <table className={"w-[300px] bg-white"}>
                    <tbody className={"border-1"}>
                    <tr className={"bg-blue-300 dark:bg-blue-900 dark:text-primary"}>
                        <td className={"border-r 1 pl-1"}>Classification</td>
                        <td className={"pl-1"}>BMI range</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Severe Thinness</td>
                        <td className={"pl-1"}>{`< 16`}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Moderate Thinness</td>
                        <td className={"pl-1"}>{`16 - 17`}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Mild Thinness</td>
                        <td className={"pl-1"}>{`17 - 18.5`}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Normal</td>
                        <td className={"pl-1"}>{`18.5 - 25`}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Overweight</td>
                        <td className={"pl-1"}>{`25 - 30`}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Obese Class I</td>
                        <td className={"pl-1"}>{`30 - 35`}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Obese Class II</td>
                        <td className={"pl-1"}>{`35 - 40`}</td>
                    </tr>
                    <tr className={"border"}>
                        <td className={"border-r 1 pl-1"}>Obese Class III</td>
                        <td className={"pl-1"}>{`> 40`}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}