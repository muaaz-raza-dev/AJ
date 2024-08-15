import { IstudentShort } from "./IstudentsDir.t";

export interface IstdFeeReport{
filters : IstdFeeReportFilters;
payload: IstdFeeReportPayload;
isLoading:boolean;
}

export interface IstdFeeReportPayload{
students :(IstudentShort&{Invoice:number})[];
amount:number;
Info:{totalStudents:number;totalPaidAmount:number;totalPendingAmount:number};
status:"Pending"|"Upcoming"|"No Fees",
class : {name:string;}

}


export interface IstdFeeReportFilters{
available:{
        PaymentConfigs:{[key:string]:{value:string;label:string;feeFrequency:"Monthly"|"Yearly"|"Custom"|"One Time"}[]}, //* {SessionsId:[{monthlyFee:monthlyFeeId}]}
        Dates:{[key:string]:{[key:string]:string[]}}, //* {SessionsId:{2024:[July,August,March,May]}}
        Classes:{[key:string]:{value:string;label:string}[]}, //* {SessionsId:{2024:[July,August,March,May]}}
        Types:["Pending","Paid"], //Types =  "Pending" | "Paid"
    },
selected:{
        PaymentConfig:string,
        Type:"Pending"|"Paid",
        Month:string,
        FeeFrequency:"Monthly"|"Yearly"|"Custom"|"One Time",
        Year:string,
        Class:string,
        Session:string
};

}


export const defaultIstdFeeReport: IstdFeeReport = {
  filters: {
    available: {
      PaymentConfigs: {},
      Dates: {},
      Classes: {},
      Types: ["Pending","Paid"],
    },
    selected: {
      PaymentConfig: "",
      Type: "Pending",
      Month: "",
      FeeFrequency: "Monthly",
      Year: "",
      Class: "",
      Session: "",
    },
  },
  payload:{ students :[],amount:0,class:{name:""},status:"Pending",
  Info:{totalStudents:0,totalPaidAmount:0,totalPendingAmount:0}},
  isLoading:false,
};