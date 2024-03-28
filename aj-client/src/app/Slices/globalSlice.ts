import {createSlice} from "@reduxjs/toolkit"
import { DefaultGlobalState, IglobalState } from "../Types/Iglobal"
import InsertGlobalStateReducer from "../Reducers/GlobalStateReducer"
export  const GlobalState :IglobalState = DefaultGlobalState
export const CredentialsSlice = createSlice({
    name:"Global State",
    initialState:GlobalState,
    reducers:{InsertGlobalValues:InsertGlobalStateReducer}
})
export const {InsertGlobalValues} = CredentialsSlice.actions
export const globalState = CredentialsSlice.reducer