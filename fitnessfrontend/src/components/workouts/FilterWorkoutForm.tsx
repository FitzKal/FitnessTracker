import {useForm} from "react-hook-form";
import type {workoutFilterRequest} from "../../types/WorkoutType.ts";
import {BodyPart, Equipment, ExerciseType, Muscles} from "../../types/WorkoutEnums.ts";


export default function FilterWorkoutForm(prop:{handleFilter:(filter:workoutFilterRequest|undefined) => void}){
    const {register,handleSubmit} = useForm<workoutFilterRequest>();

    const onSubmit = (data:workoutFilterRequest) => {
        prop.handleFilter(data);
    }

    const formatLabel = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, ' ');
    };


    return(
        <div className={"flex justify-center"}>
            <div className={"border p-5 rounded-md bg-slate-50 shadow-md"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"flex flex-col gap-y-5"}>
                       <div className={"flex flex-col text-left"}>
                           <label>Enter the name of the exercise: </label>
                           <input{...register("name")} required={false}
                                 className={"border-2 rounded-lg text-center"} placeholder={"push-up"}/>
                       </div>
                        <div className={"grid lg:grid-cols-2 sm:grid-cols-1 gap-x-10 gap-y-5"}>
                            <div className={"flex flex-col text-left"}>
                                <label>Select exercise type:</label>
                                <select {...register("exerciseType")} required={false}
                                className={"border-2 rounded-lg text-center"}>
                                    <option value={""}>---Please select an exercise type---</option>
                                    {
                                        Object.values(ExerciseType).map((type) => (
                                            <option key={type} value={type}>{formatLabel(type)}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={"flex flex-col text-left"}>
                                <label>Select targeted body part:</label>
                                <select {...register("bodyPart")} required={false}
                                        className={"border-2 rounded-lg text-center"}>
                                    <option value={""}>---Please select a body part---</option>
                                    {
                                        Object.keys(BodyPart).map((part) => (
                                            <option key={part} value={part}>{formatLabel(part)}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={"flex flex-col text-left"}>
                                <label>Select targeted muscle group:</label>
                                <select {...register("targetMuscles")} required={false}
                                        className={"border-2 rounded-lg text-center"}>
                                    <option value={""}>---Please select a targeted muscle---</option>
                                    {
                                        Object.keys(Muscles).map((muscle) => (
                                            <option key={muscle} value={muscle}>{formatLabel(muscle)}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={"flex flex-col text-left"}>
                                <label>Select targeted secondary muscle group:</label>
                                <select {...register("secondaryMuscles")} required={false}
                                        className={"border-2 rounded-lg text-center"}>
                                    <option value={""}>---Please select a targeted secondary muscle---</option>
                                    {
                                        Object.keys(Muscles).map((muscle) => (
                                            <option key={muscle} value={muscle}>{formatLabel(muscle)}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={"flex flex-col text-left"}>
                            <label>Select a chosen equipment:</label>
                            <select {...register("equipment")} required={false}
                                    className={"border-2 rounded-lg text-center"}>
                                <option value={""}>---Please select an equipment---</option>
                                {
                                    Object.keys(Equipment).map((equipment) => (
                                        <option key={equipment} value={equipment}>{formatLabel(equipment)}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className={"grid mt-5 lg:grid-cols-2 sm:grid-cols-1 gap-x-1"}>
                        <button type={"submit"} className={"bg-blue-300 px-5 rounded-lg transition delay-50 ease-in-out hover:bg-blue-500"}>Apply filter</button>
                        <button className={"bg-red-300 px-5 rounded-lg transition delay-50 ease-in-out hover:bg-red-500 lg:mt-0 sm:mt-2"}
                        onSubmit={()=>prop.handleFilter(undefined)}>Delete Filter</button>
                    </div>
                </form>
            </div>
        </div>
    );
}