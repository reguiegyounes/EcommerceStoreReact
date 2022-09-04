import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Product } from "../models/product";

axios.defaults.baseURL='http://localhost:5678/api/';

const responseBody=(respoonse : AxiosResponse)=> respoonse.data;

axios.interceptors.response.use(response => {
    return response;
},(error :AxiosError)=>{
    //console.log("caught bu interceptor");
    const {data,status}=error.response!;
    switch (status) {
        case 400:
            toast.error("error 400");
            break;
    
        default:
            break;
    }
    return Promise.reject(error.response); 
});

const requests ={
    get : async <T = any>(url : string) => (await axios.get<T>(url)).data,
    post : (url : string,body : {}) => axios.post(url,body).then(responseBody),
    put : (url : string ,body :{}) => axios.put(url,body).then(responseBody),
    delete : (url : string) => axios.delete(url).then(responseBody),
};


const Catalog ={
    list :async () => await requests.get<Product[]>('products'),
    details :async (id : string) => await requests.get<Product | null>(`products/${id}`)
};

const TestErrors = {
    get400Error : async () => await requests.get('buggy/bad-request'),
    get401Error : async () => await requests.get('buggy/unauthorized'),
    get404Error : async () => await requests.get('buggy/not-found'),
    get500Error : async () => await requests.get('buggy/server-error'),
    getValidationError : async () => await requests.get('buggy/validation-error'),
}


const agent ={
    Catalog,
    TestErrors
};

export default agent;