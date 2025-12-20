// ------------- CalculateByProfile -------------

import api from "./AxiosConfig.ts";

export const calculateByProfile = async () => {
    try{
        return api.get("/bmi")
            .then(res => res.data)
            .then(data => parseToTwoDigits(data))
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

// ------------- CalculateCustom -------------
export const calculateCustomBMI = async (height:number, weight:number) => {
    try{
        return api.get("/bmi",{
            params:{
                height : height,
                weight : weight
            }
        })
            .then(res => res.data)
            .then(data => parseToTwoDigits(data));
    }catch (error){
        const message = (error as Error).message;
        console.log(message);
        return message;
    }
}

const parseToTwoDigits = (raw:number) =>{
    let dataString = raw.toString();
    dataString = dataString.substring(0,5);
    return parseFloat(dataString);
}


export const BMIClassing = (value: number ):string[] => {
    const array:string[] = [];
    if ( 0 < value && value < 18.5){
        array.push("text-yellow-500");
        array.push("underweight");
        return array;
    }else if(18.5 <= value && value <= 24.9){
        array.push("text-green-500");
        array.push("normal");
        return array;
    }else{
        array.push("text-red-500");
        array.push("overweight");
        return array;
    }
}