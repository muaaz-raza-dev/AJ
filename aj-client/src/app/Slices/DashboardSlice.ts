
import {createSlice} from "@reduxjs/toolkit"
import { defaultDashboard, Idashboard } from "../Types/Idashboard"
import { DashFilterBySearchFn, InputClassFilterFn, InsertBulkDashValuesFn, InsertDashFiltersFn, InsertDashPayloadFn, ResetFiltersStateFn } from "../Reducers/DashboardReducer"
export  const DashboardState :Idashboard = defaultDashboard
export const CredentialsSlice = createSlice({
    name:"Global State",
    initialState:DashboardState,
    reducers:{RedDashInsertBulk:InsertBulkDashValuesFn,RedDashInsertPayload:InsertDashPayloadFn , RedDashFilters : InsertDashFiltersFn ,
        RedDashSearch:DashFilterBySearchFn ,RedDashPayloadReset:ResetFiltersStateFn ,
        RedDashSearchClassFilter : InputClassFilterFn
    }
})
export const {RedDashFilters,RedDashInsertBulk,RedDashInsertPayload,RedDashSearch,RedDashPayloadReset ,RedDashSearchClassFilter} = CredentialsSlice.actions
export const dashboardSlice = CredentialsSlice.reducer