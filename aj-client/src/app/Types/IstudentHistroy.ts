import { IDuesTrCompose } from "./IcomposeTransactionFilters";

export interface IstudentHistory{
filters :IstudentHistoryFilter;
payload: IstudentHistoryPayload ;
}

export interface IstudentHistoryPayload{ 
stats:{totalPaid:number ; totalDues:number} ;
studentInformation : {FirstName:string;LastName:string;DOA:string;GRNO:number|string};
ClassHistory:{name:string;Date:string;Session:string;Class:string}[];
FeeHistory:IfeeHistory[];
Dues:IDuesTrCompose[]
}
export interface IfeeHistory {
        _id:string, feeTitle:string,
        month?:string;
        year?:string;
        amount:number,session:string,class:string,
        status:"Not applicable" | "Not paid" | "Not required" | "Upcoming" | "Paid" | "Advanced paid";
        transactionId:string
}
export interface IstudentHistoryFilter{ 
    feeTypes: {
        available:string[];
        selected: string;
    } ;
    Sessions : {
        available:{label:string,value:string}[];
        selected: string;
    } ,
    PaymentConfigs :{
        available:{[key:string]:{[key:string]:{label:string,value:string}[]}};
        selected: string;
    } ,
    DataTypes : {available:string[];selected:string}
    , isLoading:boolean
} 

export const defaultStudentHistory: IstudentHistory = {
    filters: {
            DataTypes:{available:["All","Dues"],selected:"All"},
            feeTypes: { available: [], selected: '' },
            Sessions: { available: [], selected: '' },
            PaymentConfigs: { available: {}, selected: '' },
            isLoading: false,
    },
    payload:{stats:{totalDues:0,totalPaid:0},ClassHistory:[],studentInformation:{FirstName:"",LastName:"",DOA:"",GRNO:""},
    FeeHistory:[] ,
    Dues:[],
}
  };