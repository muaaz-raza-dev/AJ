import {createSlice} from "@reduxjs/toolkit"
import { defaultIstdFeeReport, IstdFeeReport } from "../Types/IstdFeeReport"
import { InsertFiltersFn, InsertPayloadFn } from "../Reducers/StdFeeReportReducer"
export  const StdFeeReport :IstdFeeReport = defaultIstdFeeReport
export const CredentialsSlice = createSlice({
    name:"Student Fee Slice",
    initialState:StdFeeReport,
    reducers:{RedSFRFilters:InsertFiltersFn,RedSFRPayload:InsertPayloadFn}
})
export const {RedSFRFilters,RedSFRPayload} = CredentialsSlice.actions
export const stdFeeReport = CredentialsSlice.reducer