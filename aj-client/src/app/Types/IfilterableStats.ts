export interface IfilterableStats {
    isLoading:boolean;
    filters:IfilterableStatsFilters;
    payload:IfilterableStatsPayload[]
}

export interface IfilterableStatsPayload{
    label:string;
    value:number;
    percentage:number;
}
export interface IfilterableStatsFilters{
    available:{
        PaymentConfigs:{[key:string]:{value:string;label:string;feeFrequency:"Monthly"|"Yearly"|"Custom"|"One Time"}[]}, //* {SessionsId:[{monthlyFee:monthlyFeeId}]}
        Dates:{[key:string]:{[key:string]:string[]}}, //* {SessionsId:{2024:[July,August,March,May]}}
        Classes:{[key:string]:{value:string;label:string}[]}, //* {SessionsId:{2024:[July,August,March,May]}}
    },
    selected:{
        PaymentConfig:string,
        month:string,
        feeFrequency:"Monthly"|"Yearly"|"Custom"|"One Time",
        year:string,
        Class:string,
        Session:string
    }
}
export const defaultFilterableStats: IfilterableStats = {
    isLoading: false,
    filters: {
        available:{
            PaymentConfigs: {},
            Dates: {  },
            Classes: { },
        },
        selected:{
            PaymentConfig: "",
            feeFrequency:"Monthly",
            month: "",
            year: "",
            Class: "",
            Session: "",
        }
      },
    payload: [],
  };