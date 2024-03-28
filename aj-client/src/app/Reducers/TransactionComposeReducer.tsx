import { PayloadAction } from "@reduxjs/toolkit";
import { ItransactionComposeState } from "../Types/IcomposeTransaction";
import { IstudentShort } from "../Types/IstudentsDir.t";
interface IPayload {
  student?: IstudentShort;
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
  if (payload.student) state.student = payload.student;
  if (payload.Note) state.Note = payload.Note;
  if (payload.Dates) state.Dates = payload.Dates;
  if (payload.PayorsName) state.PayorsName = payload.PayorsName;
  if (payload.PaidAmount) state.PaidAmount = payload.PaidAmount;
  if (payload.totalAmount) state.totalAmount = payload.totalAmount;
  if (payload.Invoice) state.Invoice = payload.Invoice;
  if (payload.Errors!=undefined) state.Errors = payload.Errors;
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
    payload: { index, purpose, month, year, amount ,Transactions },
  }: PayloadAction<ItransitionInsert>
) => {
  let UpdatedTransactionState = {...Transactions,index:{ amount, month, year ,purpose }}
  state.Transactions[index] = { amount, month, year ,purpose };

  state.totalAmount= TotalAmountCalculator(UpdatedTransactionState) //* I am updating it immediatly for calculating total
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
    state.totalAmount = TotalAmountCalculator(UpdatedTransactionState)
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
  [key: string]: {purpose:string; month?: string; year?: string; amount: number };
}){
  let total = 0
  
  Object.values(Tr).forEach(elm=>{
    
    total+= +elm.amount
  })
  // console.log(total);
  return total
}
