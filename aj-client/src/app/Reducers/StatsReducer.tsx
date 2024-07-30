import { PayloadAction } from "@reduxjs/toolkit"
import { IdailyStats, ImonthlyStats, IstatCharts } from "../Types/IstatsCharts"
interface  IpayloadMonthlyFilters {
    type:  "monthly"
    InsertType:"selected"|"available";
    available?:string[]
    selected?:string;
    isLoading?:boolean;
} 
interface IpayloadDailyFilters {
    type:  "daily"
    InsertType:"selected"|"available";
    available?:{[key:string]:string[]};
    selected?:{year:string;month:string};
    isLoading?:boolean;
}
type IfilterPayload = IpayloadDailyFilters|IpayloadMonthlyFilters

export const InsertStatFiltersFn = (state:IstatCharts,{payload:{type,InsertType,isLoading,selected,available}}:PayloadAction<IfilterPayload>) => {
if(type == 'monthly'){
        if(InsertType == "selected" && selected && typeof selected =="string"){
            state.filters[type].selected = selected
        }
        else if(InsertType == "available"&&available) {
            let Available = available as string[]
         state.filters[type].available = Available
        }
    
}
else {
    if(InsertType == "selected" && selected &&  typeof selected !="string" ){
        state.filters[type].selected = selected
    }
    else if(InsertType == "available") {
        let Available = available as {[key:string]:string[]}
        if(Available) state.filters[type].available = Available
    }
}
if(isLoading!=undefined) state.filters[type].isLoading = isLoading

}


interface  Ipayload {
        monthly?:{chartData: ImonthlyStats[]; average:number //average per month 
             };
        daily?: {
            chartData: IdailyStats[]; average:number // average per day
        },
        isLoading?:boolean
}
export const InsertStatPayloadFn = (state:IstatCharts,{payload:{daily,monthly}}:PayloadAction<Ipayload>) => {
    if(daily) state.payload.daily = daily
    if(monthly) state.payload.monthly = monthly
    }
    


