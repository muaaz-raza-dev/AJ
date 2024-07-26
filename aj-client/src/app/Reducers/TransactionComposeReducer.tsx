import { PayloadAction } from "@reduxjs/toolkit";
import { ClassBasedFeeDetails, IcomposeTransactionFilters } from "../Types/IcomposeTransactionFilters";
import { IstudentExclusive } from "../Types/IStudentExclusive";
interface ItrComposeFilterInsert {
    isLoading?:boolean , 
    StudentInfo?:IstudentExclusive |null,
    ClassbasedFeeInfo ?: ClassBasedFeeDetails ,
    FeeInfo?:{
        Purposes:{value:string,feeTitle:string,label:string,feeFrequency:"One Time"|"Custom"|"Yearly"|"Monthly";sessionId:string}[] ,
        Dates : {[key:string]:{[key:string]: string[] }} ,
        Amounts : {[key:string]:number} ,
    },Invoice?:string ,
    isPrint?:boolean
    Dues?: {_id:string, feeTitle:string, dueDate:string,feeFrequency:string,
        amount:number,session:string,class:string;month:string,year:string}[]
    
}

export const InsertTrComposeFiltersFn = (state:IcomposeTransactionFilters,{payload}:PayloadAction<ItrComposeFilterInsert>)=>{
let {isLoading,StudentInfo,ClassbasedFeeInfo,FeeInfo,Invoice ,Dues,isPrint} = payload
if(isLoading!=undefined) state.isLoading = isLoading
if(StudentInfo!=undefined) state.StudentInfo = StudentInfo
if(ClassbasedFeeInfo!=undefined) state.ClassbasedFeeInfo = ClassbasedFeeInfo
if(FeeInfo!=undefined) state.FeeInfo = FeeInfo
if(Invoice!=undefined) state.Invoice = Invoice
if(Dues) state.Dues = Dues
if(isPrint!=undefined) state.isPrint =isPrint
}

interface IcalculateDiscountedTotal {
    Amounts :{ 
        discount ?: number ,  //Just in number 
        realAmount :number , //without discount 
        totalAmount:number   //After discount
    }[]
}
export const CalculateDiscountedTotalFn = (state:IcomposeTransactionFilters,{payload}:PayloadAction<IcalculateDiscountedTotal>)=>{
    let {Amounts} = payload 
    let totalDiscount = 0
    Amounts.map(e=>{
        let discount = e.discount || 0
        totalDiscount += discount
    })
    state.DiscountedTotal = totalDiscount
}
