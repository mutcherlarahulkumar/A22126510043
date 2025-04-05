import { useContext, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import { userContext } from "../context";

export default function Display(){
    const {data} = useContext(userContext);
    return (
        <div>
            <div> Your Expenses </div>
            <div>
                {data.map((item,index)=>(
                    <ExpenseCard key={index} name={item.name} date={item.date} amount={item.amount} />
                ))}
                
            </div>
        </div>
    )
}