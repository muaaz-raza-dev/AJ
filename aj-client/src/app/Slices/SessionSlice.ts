import {createSlice} from "@reduxjs/toolkit"
import { defaultLandingSessions, IlandingSessions } from "../Types/Isessions"
import InsertSessionPayload from "../Reducers/SessionReducer"
export  const GlobalState :IlandingSessions = defaultLandingSessions
export const CredentialsSlice = createSlice({
    name:"Session State",
    initialState:GlobalState,
    reducers:{RedSesInsertPayload:InsertSessionPayload}
})
export const {RedSesInsertPayload} = CredentialsSlice.actions
export const LandingSessions = CredentialsSlice.reducer