import {createSlice} from "@reduxjs/toolkit"
import { defaultTransactionRead, ItransactionRead } from "../Types/ItransactionsRead"
import InsertTransactionsStateFn from "../Reducers/TransactionReadReducer"


export const TransactionsState :ItransactionRead=defaultTransactionRead

export const Transactions = createSlice({
    name:"Student Registeration",
    initialState:TransactionsState,
    reducers:{RedTransactionsReadInsert:InsertTransactionsStateFn}
})
export const {RedTransactionsReadInsert} = Transactions.actions
export const TransactionRead = Transactions.reducer