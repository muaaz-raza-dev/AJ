import {createSlice} from "@reduxjs/toolkit"
import { defaultTransactionComposeState, ItransactionComposeState } from "../Types/IcomposeTransaction"
import InsertInsertTransactionComposeFn, { AddTransactionPurposeFn, DeleteTransactionPurposeFn, InsertTransactionPurposeValuesFn, ResetTransactionComposeFn } from "../Reducers/TransactionComposeReducer"


export const TransactionComposeState :ItransactionComposeState =defaultTransactionComposeState
export const StudentRegSlice = createSlice({
    name:"Student Registeration",
    initialState:TransactionComposeState,
    reducers:{RedInsertTransactionCompose:InsertInsertTransactionComposeFn,RedAddTransactionPurpose:AddTransactionPurposeFn,RedDeleteTransactionPurpose:DeleteTransactionPurposeFn ,
    RedInsertTransactionPurpose:InsertTransactionPurposeValuesFn ,RedResetTransactionCompose:ResetTransactionComposeFn}
})
export const {RedInsertTransactionCompose,RedAddTransactionPurpose,RedDeleteTransactionPurpose,RedInsertTransactionPurpose ,RedResetTransactionCompose} = StudentRegSlice.actions
export const TransactionCompose = StudentRegSlice.reducer