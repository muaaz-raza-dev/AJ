import { PayloadAction } from "@reduxjs/toolkit";
import { IdetailedRevenue, IdetailedRevenuePayload } from "../Types/IdetailedRevenue";

interface Ifilters {
Dates?: {start?:string;end?:string}
}
interface Ipayload {
    payload : IdetailedRevenuePayload[]
}
export const InsertFiltersFn =  (state:IdetailedRevenue , {payload:{Dates}}:PayloadAction<Ifilters>)=>{
    if(Dates)
    {
     if(Dates.start)   state.filters.Dates.start = Dates.start
     if(Dates.end)   state.filters.Dates.start = Dates.end
    }
}

export const InsertPayloadFn =  (state:IdetailedRevenue , {payload:{payload}}:PayloadAction<Ipayload>)=>{
 state.payload = payload
}
