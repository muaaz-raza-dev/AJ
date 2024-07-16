import { PayloadAction } from "@reduxjs/toolkit";
import { IstudentShort } from "../Types/IstudentsDir.t";
import { ClassBasedFeeDetails, IcomposeTransactionFilters } from "../Types/IcomposeTransactionFilters";
interface ItrComposeFilterInsert {
    isLoading?:boolean , 
    StudentInfo?:IstudentShort ,
    ClassbasedFeeInfo ?: ClassBasedFeeDetails ,
    FeeInfo?:{
        Purposes:{value:string,label:string}[] ,
        Dates : {[key:string]:{[key:string]: string[] }} ,
        Amounts : {[key:string]:number}
    },Invoice?:string
    
}

export const InsertTrComposeFiltersFn = (state:IcomposeTransactionFilters,{payload}:PayloadAction<ItrComposeFilterInsert>)=>{
let {isLoading,StudentInfo,ClassbasedFeeInfo,FeeInfo,Invoice} = payload
if(isLoading!=undefined) state.isLoading = isLoading
if(StudentInfo!=undefined) state.StudentInfo = StudentInfo
if(ClassbasedFeeInfo!=undefined) state.ClassbasedFeeInfo = ClassbasedFeeInfo
if(FeeInfo!=undefined) state.FeeInfo = FeeInfo
if(Invoice!=undefined) state.Invoice = Invoice
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
