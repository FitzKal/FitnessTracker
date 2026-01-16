import {getAllWorkouts, getWorkoutBySearch} from "../../services/WorkoutService.ts";
import {useEffect, useState} from "react";
import type {workoutFilterRequest, WorkoutListElement, WorkoutSearch} from "../../types/WorkoutType.ts";
import Workout from "./Workout.tsx";
import {useQuery} from "@tanstack/react-query";
import {UserStore} from "../../stores/UserStore.ts";
import FilterWorkoutForm from "./FilterWorkoutForm.tsx";
import WorkoutSearchBar from "./workoutBySearch/WorkoutSearchBar.tsx";
import WorkoutBySearchElement from "./workoutBySearch/WorkoutBySearchElement.tsx";

export default function DisplayWorkouts(){
    const [page,setPage] = useState<number>(1);
    const[before,setBefore] = useState<string>();
    const[after,setAfter] = useState<string>();

    const[isInDepthFiltered,setInDepthIsFiltered] = useState<boolean>(false);
    const[filter,setFilter] = useState<workoutFilterRequest>();

    const[searchByName, setSearchByName] = useState<boolean>(false);
    const[isSearchEnabled,setSearchEnabled] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>();

    const {data,isLoading} = useQuery({
        queryKey:["allWorkouts",UserStore.getState().user?.id,page,filter,
            before,
            after,
            filter],
        queryFn:async () => {
            return await getAllWorkouts(before,after,filter);
        },
        enabled:!isSearchEnabled
    });

    const {data:searchData, isLoading:isSearchLoading} = useQuery({
        queryKey:["SearchedWorkouts", UserStore.getState().user?.id,searchTerm],
        queryFn: async() => {
            return await getWorkoutBySearch(searchTerm);
        },
        enabled: isSearchEnabled && !!searchTerm
    })

    useEffect(() => {
        console.log(searchData);
    }, [searchData]);

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

    const handleFilter = (filter:workoutFilterRequest|undefined) => {
        setFilter(filter);
        setSearchEnabled(false)
    }

    const handleFilterChange = () => {
        if (isInDepthFiltered){
            setInDepthIsFiltered(false);
        }else {
            setInDepthIsFiltered(true);
            setSearchByName(false);
        }
    }

    const handleSearchTerm = (term:string|undefined) => {
        setSearchTerm(term);
        setSearchEnabled(true)
        setFilter(undefined);
    }

    const handleSearchEnable = () => {
        setSearchEnabled(false);
    }

    const handleSearchChange = () => {
        if (searchByName){
            setSearchByName(false);
        }else {
            setSearchByName(true);
            setInDepthIsFiltered(false)
        }
    }

    if ((!isSearchEnabled && (isLoading || !data)) ||
        (isSearchEnabled && (isSearchLoading || !searchData))){
        return (
            <div className={"text-center text-4xl"}>
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
                    <div className={"flex justify-center gap-x-5 my-2"}>
                        <button className={`${!searchByName?"bg-green-300 dark:bg-green-600 ":"bg-green-600 dark:bg-green-900"} px-5 rounded-lg transition delay-50 ease-in-out hover:bg-green-600 dark:hover:bg-green-900 `}
                        onClick={handleSearchChange}>Search by name</button>
                        <button className={`${!isInDepthFiltered?"bg-blue-300 dark:bg-blue-600":"bg-blue-500 dark:bg-blue-900"} px-5 rounded-lg transition delay-50 ease-in-out hover:bg-blue-500 dark:hover:bg-blue-900`}
                                onClick={handleFilterChange}>More in-depth filtering </button>
                    </div>
                    {
                        isInDepthFiltered?
                            <div>
                                <FilterWorkoutForm handleFilter={handleFilter}/>
                            </div>:
                            <></>
                    }
                    {
                        searchByName?
                            <WorkoutSearchBar setSearchTerm={handleSearchTerm} handleSearchEnable={handleSearchEnable}/>:
                            <></>
                    }
                   <ul>
                      <div>
                          {
                            !isSearchEnabled?
                                data.data.map((workout:WorkoutListElement)=>
                                    <li>
                                        <Workout workoutDetails={workout} key={workout.exerciseId}/>
                                    </li>
                                ):
                                searchData.map((workout:WorkoutSearch) =>
                                <li>
                                    <WorkoutBySearchElement key={workout.exerciseId} workoutDetails={workout}/>
                                </li>)
                          }
                      </div>
                   </ul>
                    <div className={"flex justify-center gap-x-20 pb-2"}>
                        <button className={"bg-red-300 dark:bg-red-500 px-5 rounded-lg transition delay-50 ease-in-out hover:bg-red-500 dark:hover:bg-red-800"}
                                onClick={handlePageBackward} disabled={isSearchEnabled}>page back</button>
                        <span className={"bg-white border border-slate-300 dark:bg-surface dark:border-surface-border dark:border-surface-border rounded-2xl px-5"}>Page number {page}</span>
                        <button className={"bg-red-300 dark:bg-red-500 px-5 rounded-lg transition delay-50 ease-in-out hover:bg-red-500 dark:hover:bg-red-800"}
                                onClick={handlePageForward} disabled={isSearchEnabled}>next page</button>
                    </div>
                </div>
            </div>
        )
    }
}