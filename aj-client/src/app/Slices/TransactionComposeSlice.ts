import { createSlice } from "@reduxjs/toolkit"

import { defaultTransactionFilters, IcomposeTransactionFilters } from "../Types/IcomposeTransactionFilters"
import { CalculateDiscountedTotalFn, ClearDataFn, InsertTrComposeFiltersFn } from "../Reducers/TransactionComposeReducer"


export const TransactionComposeState: IcomposeTransactionFilters = defaultTransactionFilters
export const StudentRegSlice = createSlice({
    name: "Student Registeration",
    initialState: TransactionComposeState,
    reducers: { RedTrcInsertFilters:InsertTrComposeFiltersFn ,RedTrcDiscountedTotal:CalculateDiscountedTotalFn,RedTrcClearData:ClearDataFn}
})
export const {RedTrcInsertFilters,RedTrcDiscountedTotal,RedTrcClearData} = StudentRegSlice.actions
export const TransactionCompose = StudentRegSlice.reducer