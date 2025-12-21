import {useForm} from "react-hook-form";
import type {BMIForm} from "../../../types/FormTypes.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserStore} from "../../../stores/UserStore.ts";
import {calculateCustomBMI} from "../../../services/BMIService.ts";
import {toast} from "react-toastify";

export default function CustomBMIForm(props:{handleCustomScore:(fetchedScore:number) => void, handleCustomDetails:(fetchedDetails:BMIForm) => void,
    customBMIDetails:BMIForm}){
    const {register, handleSubmit, formState:{isSubmitting}} = useForm<BMIForm>();

    const bmiMutation = useMutation({
        mutationFn:(bmiData:BMIForm) => {
            props.handleCustomScore(Number(calculateCustomBMI(bmiData)));
            return calculateCustomBMI(bmiData);
        },
        onSuccess:(data) =>{
            props.handleCustomScore(Number(data))
        },
        onError:(error) => {
            if (error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Something went wrong");
            }
        }
    })

    const onSubmit = (bmiData:BMIForm) =>{
        props.handleCustomDetails(bmiData);
        bmiMutation.mutate(bmiData);
    }

    return(
        <div className={"flex justify-center"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-y-7 mt-10"}>
                    <div className={"flex flex-row gap-1"}>
                        <label>Height: </label>
                        <input {...register("height")} className={"bg-white rounded-md border-1"} type={"number"} required={true}/>
                    </div>

                    <div className={"flex flex-row gap-1"}>
                        <label>Weight: </label>
                        <input {...register("weight")} className={"bg-white rounded-md border-1"} type={"number"} required={true}/>
                    </div>
                    <div className={"flex justify-center"}>
                        <button type={"submit"} className={"rounded-xl bg-red-400 hover:bg-red-500 font-semibold transition-colors px-6 py-2"}>Calculate BMI</button>
                    </div>
                </div>
            </form>
        </div>
    );
}