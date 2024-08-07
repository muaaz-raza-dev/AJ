import {createSlice} from "@reduxjs/toolkit"
import { defaultFilterableStats, IfilterableStats } from "../Types/IfilterableStats"
import { InsertFiltersFn, InsertPayloadFn } from "../Reducers/FilterableStatsReducer"
export  const FilterableStats :IfilterableStats = defaultFilterableStats
export const FStats = createSlice({
    name:"Filterable Stats",
    initialState:FilterableStats,
    reducers:{RedFsFilters:InsertFiltersFn,RedFsPayload:InsertPayloadFn}
})
export const {RedFsFilters,RedFsPayload} = FStats.actions
export const Fstats = FStats.reducer