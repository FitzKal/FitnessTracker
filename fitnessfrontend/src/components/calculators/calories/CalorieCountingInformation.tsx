export default function CalorieCountingInformation(){
    return(
        <div className="relative border-2 border-black p-6 rounded-md mx-3 bg-[#C4AD97] dark:bg-[#2F2A24] dark:border-surface-border">
                              <span className="absolute -top-3 left-4 bg-gray-300 dark:bg-gray-600 px-3 rounded-full text-sm font-semibold">
                                How is calorie intake calculated?
                              </span>
            <p>This Calorie Calculator is based on several equations, and the results of the calculator are based on an estimated average.</p>
            <p>On this website, the calories are counted by the following formula, which was found to be the most accurate:</p>
            <br/>
            <p><strong>Mifflin-St Jeor Equation:</strong></p>
            <div className={"text-center"}>
                <p>For men: <strong>10W + 6.25H - 5A + 5</strong></p>
                <p>For women: <strong>10W + 6.25H - 5A - 161</strong></p>
            </div>
            <br/>
            <p>The letters are abbreviations for:</p>
                <ul className={"list-disc"}>
                    <div className={"ml-10"}>
                        <li>A: Age</li>
                        <li>H: Height</li>
                        <li>W: Weight</li>
                    </div>
                </ul>
            <br/>
            <p>The value obtained from these equations is the estimated number of calories a person can consume in a day to maintain their body-weight, assuming they remain at rest.
                This value is multiplied by an activity factor (generally 1.2-1.95) dependent on a person's typical levels of exercise, which accounts for times during the day when a person is not at rest.</p>
        </div>
    )
}