import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getWorkoutById} from "../../services/WorkoutService.ts";
import {useEffect} from "react";

export default function WorkoutPage(){
    const {params} = useParams();
    const excId = params !== undefined? String(params) : undefined;

    const {data,isLoading} = useQuery({
        queryKey:["workoutById",excId],
        queryFn: async ()=> {
            console.log(excId);
            return await getWorkoutById(excId);
        }
    })

    useEffect(() => {
        console.log(data)
    }, []);

    return(<div className={"text-center"}>
    </div>);
}