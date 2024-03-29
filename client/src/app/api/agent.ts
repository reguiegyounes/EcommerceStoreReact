import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Product } from "../models/product";
import { Basket } from "../models/basket";
import { history } from "../.."

const sleep =() => new Promise(resolve => setTimeout(resolve, 300));

axios.defaults.baseURL='http://localhost:5678/api/';
axios.defaults.withCredentials =true;

const responseBody=(respoonse : AxiosResponse)=> respoonse.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
},(error :AxiosError<any>)=>{
    //console.log("caught bu interceptor");
    const {data,status}=error.response!;
    switch (status) {
        case 400:
            toast.error(data.title);
            break;
        case 500:
            history.push('/server-error',{error : data})
            break;
        default:
            break;
    }
    return Promise.reject(error.response); 
});

const requests ={
    get : async <T = any>(url : string) => (await axios.get<T>(url)).data,
    post : async  <T = any>(url : string,body : {}) => (await axios.post<T>(url,body)).data,
    put : (url : string ,body :{}) => axios.put(url,body).then(responseBody),
    delete : (url : string) => axios.delete(url).then(responseBody),
};


const Catalog ={
    list :async () => await requests.get<Product[]>('products'),
    details :async (id : string) => await requests.get<Product | null>(`products/${id}`)
};

const BasketApi ={
    get : async () => await requests.get<Basket>('basket'),
    addItem : (productId : string, quantity =1) => requests.post<Basket>(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem : (productId : string, quantity =1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
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
    BasketApi,
    TestErrors
};

export default agent;