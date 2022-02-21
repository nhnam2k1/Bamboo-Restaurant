import axios from "axios";
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_API_URL;

const errorHandle = (error) => {
    let errMsg = "";
    if (error.response) {
        const { data } = error.response;
        errMsg = data;
    } 
    else if (error.request) errMsg = error.request;
    else throw error;
    throw new Error(JSON.stringify(errMsg));
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});

axiosInstance.interceptors.request.use((config) => {
    //console.log("Config ", config);
    let checkLoginRegistration = config.url.includes("authenticate") 
                                || config.url.includes("register");

    if (!checkLoginRegistration){
        config.headers["Authorization"] = `Bearer ${AuthService.getAccessToken()}`;
    }
    return config;
},
errorHandle);

axiosInstance.interceptors.response.use((response) => {
    //console.log("Repsonse ", response);
    return response;
},
errorHandle);

export default axiosInstance;

