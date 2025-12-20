export default function ProgressBar({ value }: { value: number }) {
    const returnBarColour = (value: number ):string => {
        if ( 0 < value && value < 18.5){
            return "bg-yellow-500";
        }else if(18.5 <= value && value <= 24.9){
            return "bg-green-500";
        }else{
            return "bg-red-500";
        }
    }

    const returnPercentage = (value:number):number => {
        return (100*value)/40;
    }

    return (
        <div className="w-full h-5 bg-gray-200 rounded-md overflow-hidden border-2">
            <div
                className={`h-full ${returnBarColour(value)} transition-all duration-300 ease-out`}
                style={{ width: `${returnPercentage(value)}%` }}
            />
        </div>
    );
}