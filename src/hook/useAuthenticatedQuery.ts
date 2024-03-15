import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";


interface useAuthenticatedQuery {
    queryKey:string[],
    url:string,
    config?:AxiosRequestConfig
}
const useAuthenticatedQuery = ({queryKey,url,config}:useAuthenticatedQuery)=>{
    return  useQuery({
        queryKey,
        queryFn: async()=>{
            const {data} = await axiosInstance.get(url,config);
            return data
        },
    });
};


export default useAuthenticatedQuery