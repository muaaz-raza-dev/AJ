import {createSlice} from "@reduxjs/toolkit"
import { defaultTransactionRead, ItransactionRead } from "../Types/ItransactionsRead"
import InsertTransactionsStateFn, { TransactionsFilterManagerFn } from "../Reducers/TransactionReadReducer"


export const TransactionsState :ItransactionRead=defaultTransactionRead

export const Transactions = createSlice({
    name:"Student Registeration",
    initialState:TransactionsState,
    reducers:{RedTransactionsReadInsert:InsertTransactionsStateFn,RedTransactionsFilters:TransactionsFilterManagerFn}
})
export const {RedTransactionsReadInsert,RedTransactionsFilters} = Transactions.actions
export const TransactionRead = Transactions.reducer