export default function BmiClassificationText(prop: {classification:string}){
    if (prop.classification === "normal"){
        return (
          <div className={"ml-5 mt-5 text-xl"}>
              <p>The BMI is in the <strong className={"text-green-500"}>healthy</strong> range! It means that your height and weight are in an ideal range!</p>
              <br/>
              <p>For maintaining your current weight, you should keep you current diet.</p>
          </div>
        );
    }
    else if (prop.classification === "overweight"){
        return (
            <div className={"ml-5 mt-5 text-xl"}>
                <p>The BMI is in the <strong className={"text-red-500"}>overweight</strong> range! It means that your BMI is too high for you!</p>
                <br/>
                <p>According to your BMI, it would be advised for you to change up your diet, or exercise more frequently!</p>
            </div>
        );
    }else{
        return (
            <div className={"ml-5 mt-5 text-xl"}>
                <p>The BMI is in the <strong className={"text-yellow-500"}>underweight</strong> range! It means that your BMI is too low for you!</p>
                <br/>
                <p>According to your BMI, it would be advised for you to change up your diet, and increase your calorie intake!</p>
            </div>
        )
    }
}