import { PayloadAction } from "@reduxjs/toolkit";
import { ItransactionComposeState, MonthlyFee_history_short } from "../Types/IcomposeTransaction";
import { IstudentShort } from "../Types/IstudentsDir.t";
interface IPayload {
  student?: IstudentShort;
  MonthlyFee_history?:MonthlyFee_history_short[]
  PayorsName?: string;
  PaidAmount?: number;
  totalAmount?: number;
  Errors?:boolean;
  Transactions?: {
    [key: string]: {purpose:string; month?: string; year?: string; amount: number };
  };
  Invoice?: number;
  Note?:string;
  Dates?:{[key:string]:string[]}
}
interface ItransitionInsert {
  index: string;
  purpose: string;
  month?: string;
  year?: string;
  amount: number;
  discountedAmount?:number;
  Transactions: {
    [key: string]: {purpose:string; month?: string; year?: string; amount: number };
  };
}
interface ItransitionDelete {
  index: string;
  Transactions: {
    [key: string]: {purpose:string; month?: string; year?: string; amount: number };
  };
}

const InsertTransactionComposeFn = (
  state: ItransactionComposeState,
  { payload }: PayloadAction<IPayload>
) => {
  if (payload.student !=undefined) state.student = payload.student;
  if (payload.Note !=undefined) state.Note = payload.Note;
  if (payload.Dates !=undefined) state.Dates = payload.Dates;
  if (payload.PayorsName !=undefined) state.PayorsName = payload.PayorsName;
  if (payload.PaidAmount !=undefined) state.PaidAmount = payload.PaidAmount;
  if (payload.totalAmount !=undefined) state.totalAmount = payload.totalAmount;
  if (payload.Invoice !=undefined) state.Invoice = payload.Invoice;
  if (payload.Errors!=undefined ) state.Errors = payload.Errors;
  if(payload.MonthlyFee_history != undefined) state.MonthlyFee_history= payload.MonthlyFee_history
};

export const SwitchMonthsFn=(state:ItransactionComposeState,{payload}:PayloadAction<{year:string}>)=>{
state.months  = state.Dates[payload.year]
}

export const AddTransactionPurposeFn = (state: ItransactionComposeState) => {
  let index = (Object.keys(state.Transactions).length-1)
  if (  state.Transactions[index].purpose&&state.Transactions[index].amount ) {
    state.Transactions[Object.keys(state.Transactions).length] = {purpose:"", amount: 0 };
  }
};
export const InsertTransactionPurposeValuesFn = (
  state: ItransactionComposeState,
  {
    payload: { index, purpose, month, year, amount ,Transactions,discountedAmount },
  }: PayloadAction<ItransitionInsert>
) => {
  let UpdatedTransactionState = {...Transactions,index:{ amount, month, year ,purpose,discountedAmount }}
  state.Transactions[index] = { amount, month, year ,purpose,discountedAmount };
  let totalResults= TotalAmountCalculator(UpdatedTransactionState) //* I am updating it immediatly for calculating total
  state.totalAmount= totalResults.total
  if(totalResults.total>totalResults.discountedTotal)state.discountedTotal =totalResults.discountedTotal
};

export const DeleteTransactionPurposeFn = (
  state: ItransactionComposeState,
  { payload: { index ,Transactions} }: PayloadAction<ItransitionDelete>
) => {
  if (state.Transactions[index].purpose!=""&&state.Transactions[index].amount) {
  let UpdatedTransactionState  = {...Transactions}
  if(Object.keys(state.Transactions).length ==1){
    state.Transactions[index] = {purpose:"Monthly Fee",amount:0}
    UpdatedTransactionState[index] = {purpose:"Monthly Fee",amount:0}
   }
   else{
     delete state.Transactions[index];
     delete UpdatedTransactionState[index]
    }
    let {total,discountedTotal} = TotalAmountCalculator(UpdatedTransactionState)
    state.totalAmount =total
    if(total>discountedTotal) state.discountedTotal=discountedTotal
  }
};

export const ResetTransactionComposeFn = (state:ItransactionComposeState)=>{
state.totalAmount = 0
state.PaidAmount= 0
state.Dates = {}
state.months = []
state.PayorsName = ""
delete state.student 
state.Errors =true 
state.Invoice=0
state.Transactions = {}
}
export default InsertTransactionComposeFn;
function TotalAmountCalculator(Tr:   {
  [key: string]: {purpose:string; month?: string; year?: string; amount: number,discountedAmount?:number };
}){
  let total = 0
  let discountedTotal = 0
  Object.values(Tr).forEach(elm=>{
    if(elm.discountedAmount){
      discountedTotal +=( elm.amount - elm.discountedAmount)
    }
    else {discountedTotal+=elm.amount}
    total+= +elm.amount
  })
  return {total,discountedTotal}
}
