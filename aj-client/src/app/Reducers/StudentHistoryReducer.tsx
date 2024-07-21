import { PayloadAction } from "@reduxjs/toolkit"
import { IstudentHistory } from "../Types/IstudentHistroy"
import { IDuesTrCompose } from "../Types/IcomposeTransactionFilters";
interface ISelectedFilter {
  type: "selected";
  PaymentConfigs ?: string;
  feeTypes ?: string;
  Sessions ?: string;
  DataTypes ?:string;
  isLoading?: boolean;
}

interface IAvailableFilter {
  type: "available";
  PaymentConfigs?:{[key:string]:{[key:string]:{label:string,value:string}[]}};
  feeTypes ?:string [];

  Sessions ?: {label:string,value:string}[];
  isLoading?: boolean;
}

type Ifilters = ISelectedFilter | IAvailableFilter;

const InsertFilterFn = (state:IstudentHistory,{payload}:PayloadAction<Ifilters>) => {
  let {isLoading,type } =payload 
  if(type=="selected") {
    if(`PaymentConfigs` in payload &&  payload.PaymentConfigs && typeof payload.PaymentConfigs=="string") {
      state.filters.PaymentConfigs.selected = payload.PaymentConfigs
    }
    if("DataTypes" in payload &&payload.DataTypes) {
      state.filters.DataTypes.selected = payload.DataTypes
    }
    if(`Sessions` in payload && payload.Sessions && typeof payload.Sessions=="string") {
      state.filters.Sessions.selected = payload.Sessions 
    }
    if(`feeTypes` in payload && payload.feeTypes && typeof payload.feeTypes=="string") {
      state.filters.feeTypes.selected = payload.feeTypes 
    }
     
  }
  else {
    if(`PaymentConfigs` in payload &&  payload.PaymentConfigs && typeof payload.PaymentConfigs!="string") {
        state.filters.PaymentConfigs.available = payload.PaymentConfigs
    }
    if(`Sessions` in payload &&payload.Sessions && typeof payload.Sessions!="string") {
      state.filters.Sessions.available = payload.Sessions
  }
  if(`feeTypes` in payload && payload.feeTypes && typeof payload.feeTypes!="string") {
    state.filters.feeTypes.available = payload.feeTypes
}
  }
  if(isLoading) {
    state.filters.isLoading = isLoading
  }
}

interface Ipayload{
stats ?:{totalPaid:number ; totalDues:number} ;
studentInformation ?: {FirstName:string;LastName:string;DOA:string;GRNO:string|number};
ClassHistory?:{name:string;Date:string;Session:string;Class:string}[]
FeeHistory?:{
  _id:string, feeTitle:string,
  month?:string;
  year?:string;
  amount:number,session:string,class:string,
  status:"Not applicable" | "Not paid" | "Not required" | "Upcoming" | "Paid" | "Advanced paid";
  transactionId:string
}[] ;
Dues?:IDuesTrCompose[]
}

export const InsertPayloadFn = (state:IstudentHistory,{payload:{stats,Dues,FeeHistory,ClassHistory,studentInformation}}:PayloadAction<Ipayload>) => {
    if(stats) state.payload.stats = stats
    if(studentInformation) state.payload.studentInformation = studentInformation
    if(ClassHistory) state.payload.ClassHistory = ClassHistory
    if(FeeHistory) state.payload.FeeHistory = FeeHistory
    if(Dues) state.payload.Dues = Dues
  }

export default InsertFilterFn