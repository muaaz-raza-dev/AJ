import { IstudentExclusive } from "./IStudentExclusive";

export interface ClassBasedFeeDetails {
[key:string] : number
}
export interface IDuesTrCompose {
  _id:string, feeTitle:string, dueDate:string,feeFrequency:string,
    amount:number,session:string,class:string;month:string,year:string
}

export interface IcomposeTransactionFilters {
isLoading:boolean , 
StudentInfo?:IstudentExclusive|null ,
ClassbasedFeeInfo : ClassBasedFeeDetails ,
isPrint:boolean;
FeeInfo:{
Purposes:{value:string,feeTitle:string,label:string,feeFrequency:"One Time"|"Custom"|"Yearly"|"Monthly";sessionId:string}[],
Dates : {[key:string]:{[key:string]: string[] }},
Amounts : {[key:string]:number} },
Invoice:string ,
Dues:IDuesTrCompose[],
DiscountedTotal : number, 
}


export const defaultTransactionFilters: IcomposeTransactionFilters = {
    isLoading: false,
    DiscountedTotal: 0 ,
    isPrint:false,
    Invoice:"",
    ClassbasedFeeInfo: {},
    Dues:[],
    FeeInfo: {
      Purposes: [],
      Dates: {},
      Amounts: {},
    },
  };