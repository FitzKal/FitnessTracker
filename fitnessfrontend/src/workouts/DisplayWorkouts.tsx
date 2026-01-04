import {getAllWorkouts} from "../services/WorkoutService.ts";
import {useState} from "react";
import type {WorkoutListElement} from "../types/WorkoutType.ts";
import Workout from "./Workout.tsx";
import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../stores/UserStore.ts";

export default function DisplayWorkouts(){
    const [page,setPage] = useState<number>(1);
    const[before,setBefore] = useState<string>();
    const[after,setAfter] = useState<string>();
    const {data,isLoading} = useQuery({
        queryKey:["allWorkouts",UserStore.getState().user?.id,page],
        queryFn:async () => {
            return await getAllWorkouts(before,after);
        },
    });

    const handlePageForward = () => {
        setAfter(data.meta.nextCursor);
        setBefore(undefined);
        setPage(prevState => prevState+1);
    }
    const handlePageBackward = () => {
        if (data.meta.hasPreviousPage){
            console.log(data.meta)
            setBefore(data.meta.previousCursor);
            setAfter(undefined)
            setPage(prevState => prevState-1);
        }
    }

    if (isLoading){
        return (
            <div>
                Loading...
            </div>
        );
    }else {
        return (
            <div>
                <div>
                    <div className={"text-center my-5"}>
                        <h1 className={"text-4xl"}>Welcome to the workout catalog!</h1>
                    </div>
                    <div className={"text-center"}>
                        <p>You can check out the list of all the available workouts, or <strong>search</strong> your desired workout!</p>
                    </div>
                   <ul>
                      <div>
                          {
                              data.data.map((workout:WorkoutListElement)=>
                                  <li>
                                      <Workout workoutDetails={workout} key={workout.name}/>
                                  </li>
                              )
                          }
                      </div>
                   </ul>
                    <div className={"flex justify-center gap-1"}>
                        <button className={"border-b-2"}
                                onClick={handlePageBackward}>page back</button>
                        <button className={"border-b-2"}
                                onClick={handlePageForward}>next page</button>
                    </div>
                </div>
            </div>
        )
    }
}