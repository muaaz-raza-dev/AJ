import {createSlice} from "@reduxjs/toolkit"
import { defaultIstatCharts, IstatCharts } from "../Types/IstatsCharts"
import { InsertStatFiltersFn, InsertStatPayloadFn } from "../Reducers/StatsReducer"
export  const ChartStats :IstatCharts = defaultIstatCharts
export const CredentialsSlice = createSlice({
    name:"Chart Stats",
    initialState:ChartStats,
    reducers:{RedstInsertPayload:InsertStatPayloadFn,RedstInsertFilters:InsertStatFiltersFn}
})
export const {RedstInsertFilters,RedstInsertPayload} = CredentialsSlice.actions
export const Stats = CredentialsSlice.reducer