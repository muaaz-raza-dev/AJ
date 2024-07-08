import {createSlice} from "@reduxjs/toolkit"
import { default_classDetailed, Iclass_detailed } from "../Types/Iclass_detailed"
import { InsertFiltersFn, InsertPayloadFn } from "../Reducers/DetailedClassReducer"

export  const Credits :Iclass_detailed = default_classDetailed
export const CredentialsSlice = createSlice({
    name:"Class Detailed",
    initialState:Credits,
    reducers:{RedCDInsertPayload:InsertPayloadFn ,RedCDFilters:InsertFiltersFn}
})
export const {RedCDFilters,RedCDInsertPayload} = CredentialsSlice.actions
export const Class_detailed = CredentialsSlice.reducer