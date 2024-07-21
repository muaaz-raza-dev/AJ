import {createSlice} from "@reduxjs/toolkit"
import { defaultStudentHistory, IstudentHistory } from "../Types/IstudentHistroy"
import InsertFilterFn, { InsertPayloadFn } from "../Reducers/StudentHistoryReducer"
export  const StudentHistory :IstudentHistory = defaultStudentHistory
export const CredentialsSlice = createSlice({
    name:"Students Dir",
    initialState:StudentHistory,
    reducers:{RedHisFilters:InsertFilterFn,RedHisPayload:InsertPayloadFn}
})
export const {RedHisFilters,RedHisPayload} = CredentialsSlice.actions
export const studentHist = CredentialsSlice.reducer