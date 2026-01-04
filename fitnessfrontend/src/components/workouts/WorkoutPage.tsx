import {useParams} from "react-router-dom";

export default function WorkoutPage(){
    const {params} = useParams();
    const excId = params !== undefined? String(params) : undefined;

    return(<div className={"text-center"}>
    </div>);
}