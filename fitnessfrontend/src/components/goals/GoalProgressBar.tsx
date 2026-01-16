export default function GoalProgressBar(prop:{currentWeight:number, goalWeight:number}) {
    const returnBarColour = (currentWeight:number, max:number):string => {
        if (returnPercentage(currentWeight,max)<50){
            return "bg-red-500";
        }else if(returnPercentage(currentWeight,max)<75){
            return "bg-yellow-500";
        }else{
            return "bg-green-500";
        }
    }

    const returnPercentage = (currentWeight:number, max:number) => {
        return (currentWeight*100)/max;
    };

    return (
        <div className="w-full h-5 bg-gray-200 dark:border-surface-border rounded-md overflow-hidden border-2">
            <div
                className={`h-full ${returnBarColour(prop.currentWeight,prop.goalWeight)} transition-all duration-300 ease-out`}
                style={{ width: `${returnPercentage(prop.currentWeight,prop.goalWeight)}%` }}
            />
        </div>
    );
}