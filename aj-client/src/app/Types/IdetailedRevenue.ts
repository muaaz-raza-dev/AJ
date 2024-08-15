export interface IdetailedRevenue{
isLoading?:boolean;
filters:{
    Dates:{
        start: string;  
      end:string;     
    }
},
payload : IdetailedRevenuePayload []
}
export interface IdetailedRevenuePayload{
Name:"Grand Total"|string;
total:number;
}
export const defaultDetailedRevenue:IdetailedRevenue =  {
    isLoading:false,
    filters:{
        Dates:{
            start: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
            end: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
        }
    },
    payload:[]
}