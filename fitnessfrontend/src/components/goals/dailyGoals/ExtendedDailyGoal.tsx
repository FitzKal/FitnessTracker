import {useParams} from "react-router-dom";

export default function ExtendedDailyGoal(){
    const {params} = useParams();
    const goalId = params !== undefined ? String(params) : undefined;

    return(
        <div>

        </div>
    )
}