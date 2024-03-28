import { IstudentShort } from "./IstudentsDir.t";
import { ItransactionForm } from "./ItransactionForm";

export interface ItransactionComposeState extends ItransactionForm{
    student?:IstudentShort,
    Invoice:number,
    Dates:{[key:string]:string[]}
    months:string[],
    Transactions:{[key:string]:{purpose:string ,month?:string,year?:string,amount:number}},
    Errors:boolean,
}
export const defaultTransactionComposeState:ItransactionComposeState = {
    PayorsName: "", // string
    PaidAmount: 0, // number
    totalAmount: 0, // number
    Transactions: {"0":{amount:0,purpose:""}},
    Invoice:0, months:[],
    Dates:{},Note:"",
    Errors:true,
};