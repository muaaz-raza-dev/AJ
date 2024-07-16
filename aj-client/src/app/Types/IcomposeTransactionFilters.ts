import { IstudentShort } from "./IstudentsDir.t"

export interface ClassBasedFeeDetails {
[key:string] : number
}

export interface IcomposeTransactionFilters {
isLoading:boolean , 
StudentInfo?:IstudentShort ,
ClassbasedFeeInfo : ClassBasedFeeDetails ,
FeeInfo:{
    Purposes:{value:string,label:string,feeFrequency:"One Time"|"Custom"|"Yearly"|"Monthly"}[] ,
    Dates : {[key:string]:{[key:string]: string[] }} ,
    Amounts : {[key:string]:number}
},Invoice:string ,
DiscountedTotal : number , 
}


export const defaultTransactionFilters: IcomposeTransactionFilters = {
    isLoading: false,
    DiscountedTotal: 0 ,
    Invoice:"",
    ClassbasedFeeInfo: { /* default ClassBasedFeeDetails object */ },
    FeeInfo: {
      Purposes: [],
      Dates: {},
      Amounts: {},
    },
  };