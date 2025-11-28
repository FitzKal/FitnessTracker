import {UserStore} from "../stores/UserStore.ts";
import axios from "axios";
import {toast} from "react-toastify";


const base_url = "/api/fitness";
const getAccessToken =():string|undefined =>{
    return UserStore.getState().user?.accessToken;
}

const api = axios.create({
    baseURL:base_url,
    headers:{
        'Content-Type' : 'application/json'
    },
    withCredentials: true
})

api.interceptors.request.use(
    (config) =>{
        const token = getAccessToken();
        if (token != undefined && token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error) =>{
        if (error.response && error.response.status === 401){
            toast.error("Session timed out. Logging out!");

            UserStore.getState().stateLogout();
            window.location.href = "/login";
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
)

export default api;