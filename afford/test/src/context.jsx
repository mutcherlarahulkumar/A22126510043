import { createContext } from "react";

export const userContext = createContext({
    data:[],
    setData:()=>{},
    currentData:{},
    setCurrentData:()=>{}
})