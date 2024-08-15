import { PayloadAction } from "@reduxjs/toolkit";
import { IstdFeeReport } from "../Types/IstdFeeReport";
import { IstudentShort } from "../Types/IstudentsDir.t";

interface Ifilters {
    available?:{
        PaymentConfigs?:{[key:string]:{value:string;label:string;feeFrequency:"Monthly"|"Yearly"|"Custom"|"One Time"}[]}, //* {SessionsId:[{monthlyFee:monthlyFeeId}]}
        Dates?:{[key:string]:{[key:string]:string[]}}, //* {SessionsId:{2024:[July,August,March,May]}}
        Classes?:{[key:string]:{value:string;label:string}[]}, //* {SessionsId:{2024:[July,August,March,May]}}
        Types:string[], //Types =  "Pending" | "Paid"
    },
    selected?:{
        PaymentConfig?:string,
        Month?:string,
        Year?:string,
        Class?:string,
        Session?:string;
        FeeFrequency?:"Monthly"|"Yearly"|"Custom"|"One Time";
        Type?:string;

    };
    isLoading?:boolean

}

export const InsertFiltersFn = (state:IstdFeeReport , {payload:{available,selected,isLoading}}:PayloadAction<Ifilters>)=>{
    if(isLoading!=undefined) state.isLoading = isLoading
        if(available){
            let{Classes,Dates,PaymentConfigs}=available
            if(Classes) state.filters.available.Classes = Classes
            if(PaymentConfigs) state.filters.available.PaymentConfigs = PaymentConfigs
            if(Dates) state.filters.available.Dates =Dates
        }
        if(selected){
        let{Class,PaymentConfig,Session,FeeFrequency,Month,Type,Year}= selected
        if(Class) state.filters.selected.Class =Class
        if(PaymentConfig) state.filters.selected.PaymentConfig =PaymentConfig
        if(Month) state.filters.selected.Month =Month
        if(Year) state.filters.selected.Year =Year
        if(Session) state.filters.selected.Session =Session
        if(FeeFrequency) state.filters.selected.FeeFrequency =FeeFrequency
        if(Type=="Pending"||Type=="Paid") state.filters.selected.Type =Type
}
}
export interface Ipayload {
    payload?:{students :(IstudentShort&{Invoice:number})[];
    amount:number;
    class : {name:string;};
    status:"Pending"|"Upcoming"|"No Fees"
    Info:{totalStudents:number;totalPaidAmount:number;totalPendingAmount:number};
}
isLoading?:boolean

}

export const InsertPayloadFn = (state:IstdFeeReport, {payload:{payload,isLoading}}:PayloadAction<Ipayload>)=>{
    if(isLoading!=undefined) state.isLoading = isLoading
    if(payload)state.payload =payload
}