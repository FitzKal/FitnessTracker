import {useForm} from "react-hook-form";
import {type proteinResponse, IntakeSchema, type IntakeRequest} from "../../../types/CalculatorTypes.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {calculateCustomProteinIntake} from "../../../services/CalculatorService.ts";
import {toast} from "react-toastify";

export default function CustomProteinForm(props:{handleProteinIntakeChange:(stats:proteinResponse) => void}){
    const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm<IntakeRequest>({
        resolver:zodResolver(IntakeSchema)
    })

    const customProteinMutation = useMutation({
        mutationFn: (proteinIntake: IntakeRequest) => calculateCustomProteinIntake(proteinIntake),
        onSuccess: (result) => {
            console.log(result);
            props.handleProteinIntakeChange(result);
        },
        onError: (error) => {
            console.log(error.message);
            toast.error(error.message);
        }
    });

    const onSubmit = (request: IntakeRequest) => {
        customProteinMutation.mutate(request);
    }

    return (
        <div>
            {isSubmitting?
                <div>Loading...</div>:
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"flex justify-center gap-10 mx-20 mt-5 flex-wrap"}>
                        <div className={"flex flex-col"}>
                            <div className={"flex flex-row"}>
                                <label className={"mr-1"}>Height</label>
                                <input {...register("height",{ valueAsNumber: true })} type={"number"} required={true}
                                       className={"text-black border-2 rounded-lg focus:border-orange-400 outline-none bg-white"}
                                       placeholder={"171"}/>
                            </div>
                            <div className={"text-red-500 text-xs mt-8 absolute whitespace-nowrap h-4"}>
                                {errors.height ? errors.height.message : "\u00A0"}
                            </div>
                        </div>

                        <div className={"flex flex-col"}>
                            <div className={"flex flex-row"}>
                                <label className={"mr-1"}>Weight</label>
                                <input {...register("weight",{ valueAsNumber: true })} type={"number"} required={true}
                                       className={" text-black border-2 rounded-lg focus:border-orange-400 outline-none bg-white"}
                                       placeholder={"71"} />
                            </div>
                            <div className={" text-red-500 text-xs mt-8 absolute whitespace-nowrap h-4"}>
                                {errors.weight ? errors.weight.message : "\u00A0"}
                            </div>
                        </div>

                        <div className={"flex flex-col"}>
                            <div className={"flex flex-row"}>
                                <label className={"mr-1"}>Age</label>
                                <input {...register("age",{ valueAsNumber: true })} type={"number"} required={true}
                                       className={"text-black border-2 rounded-lg focus:border-orange-400 outline-none bg-white"}
                                       placeholder={"21"}/>
                            </div>
                            <div className={"text-red-500 text-xs mt-8 whitespace-nowrap absolute h-4"}>
                                {errors.age ? errors.age.message : "\u00A0"}
                            </div>
                        </div>

                        <div className={"flex flex-col"}>
                            <div className={"flex flex-row"}>
                                <label className={"mr-1"}>Gender</label>
                                <select {...register("gender", {
                                    required: true,
                                })} className={"bg-white text-black border-2 h-8 rounded-lg mb-1"}>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>
                            <div className={"text-red-500 text-xs mt-1 whitespace-nowrap h-4"}>
                                {errors.gender ? errors.gender.message : "\u00A0"}
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center mt-3"}>
                                <label className={"mr-1"}>Select your activity level:</label>
                                <select {...register("exerciseTypeCalc")} className={"bg-white border-1 rounded-md text-black"} id={"ExType"}>
                                    <option value={"SEDENTARY"}>Sedentary: Little to no exercise</option>
                                    <option value={"LIGHT"}>Light: Exercise 1-3 times a week</option>
                                    <option value={"MODERATE"}>Moderate: Exercise 4-5 times a week</option>
                                    <option value={"ACTIVE"}>Active: Daily exercise, or intense exercise at least 3 times a week</option>
                                    <option value={"VERY_ACTIVE"}>Very Active: Intense exercise 6-7 times a week</option>
                                    <option value={"EXTRA_ACTIVE"}>Extra Active: Intense exercise daily or physical job</option>
                                </select>
                            </div>
                            <div className={"text-red-500 text-xs mt-1 whitespace-nowrap h-4 text-center"}>
                                {errors.exerciseTypeCalc ? errors.exerciseTypeCalc.message : "\u00A0"}
                            </div>
                            <div className={"flex justify-center"}>
                                <button type={"submit"} className={"hover:bg-blue-400 rounded-md px-2 mb-2 border-2 bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 dark:border-surface-border"}
                                >Calculate daily Protein intake!</button>
                            </div>
                        </div>
                    </div>
                </form>}
        </div>
    );
}