import { IstudentShort } from "./IstudentsDir.t";
import { ItransactionForm } from "./ItransactionForm";


export interface MonthlyFee_history_short {
Time:string;
Fee:number;
duration?:{[key:string]:string[]}
}

export interface ItransactionComposeState extends ItransactionForm{
    student?:IstudentShort,
    MonthlyFee_history:MonthlyFee_history_short[]
    Invoice:number,
    Dates:{[key:string]:string[]}
    months:string[],
    Transactions:{[key:string]:{purpose:string ,month?:string,year?:string,amount:number,discountedAmount?:number}},
    Errors:boolean,
}
export const defaultTransactionComposeState:ItransactionComposeState = {
    PayorsName: "", // string
    PaidAmount: 0, // number
    totalAmount: 0, // number
    discountedTotal:0,
    Transactions: {"0":{amount:0,purpose:"",discountedAmount:0}},
    MonthlyFee_history:[],
    Invoice:0, months:[],
    Dates:{},Note:"",
    Errors:true,
};