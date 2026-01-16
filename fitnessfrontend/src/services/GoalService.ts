import api from "./AxiosConfig.ts";
import type {createGoalRequestType, ExerciseDone, updateGoalRequestType} from "../types/GoalType.ts";
import axios, {AxiosError} from "axios";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {UserStore} from "../stores/UserStore.ts";

//------------- GetAllGoals -------------
export const getAllGoals = ()=>{
    try{
        return api.get("/goal")
            .then(res => res.data);
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}


//------------- GetAllGoals -------------
export const getMonthlyGoalById = (goalId:string | undefined) => {
    try {
        return api.get(`/goal/${goalId}`)
            .then(res => res.data)
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

//------------- GetLatestGoal -------------
export const getLatestGoal = async () => {
    try{
        return api.get("/goal/getLatestGoal")
            .then(res => res.data);
    }catch (error) {
        if (error instanceof Error){
            console.log(error)
            throw new Error(error.message)
        }else{
            throw error;
        }
    }
}

//------------- PostNewMonthlyGoals -------------
export const postMonthlyGoal = async (goalData:createGoalRequestType)=> {
    try {
        return api.post("/goal", goalData)
            .then(res => res.data)
    } catch (error) {
        if (error instanceof AxiosError) {
            const axiosError = error.response?.data.message;
            throw new Error(axiosError);
        }
        throw error;
    }
}

//------------- UpdateMonthlyGoal -------------
export const updateMonthlyGoal = async (updateData:updateGoalRequestType) => {
    try{
        return api.put(`/goal/updateMonthlyGoal`,updateData)
            .then(res => res.data)
    }catch (error) {
        if (error instanceof AxiosError) {
            const axiosError = error.response?.data.message;
            throw new Error(axiosError);
        }
        throw error;
    }
}

//------------- DeleteMonthlyGoal -------------
export const deleteMonthlyGoal = async (goalId:number) => {
    try{
        return api.delete(`/goal/deleteMonthlyGoal/${goalId}`)
            .then(res => res.data)
    }catch (error){
        if (error instanceof Error){
            throw new Error(error.message);
        }
        throw error;
    }
}

//------------- AddExerciseToGoal -------------
export const addExerciseToGoal = async (workoutDetails:ExerciseDone) => {
    try {
        return api.post("/goal/addExercise", workoutDetails)
            .then(res => res.data)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw error;
    }
}

export function getCurrentDateYYYYMMDD(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}

export function parseYYYYMMDDToDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
}

const currentUser = UserStore.getState().user;

export const useLatestGoalDetails = () => {
    return useQuery({
        queryKey: ["latestGoal",currentUser?.username],
        queryFn: async () => {
            return await getLatestGoal();
        },
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            toast.error(error.message);
            return failureCount < 3;
        }
    })
}