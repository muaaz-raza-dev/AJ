import {createSlice} from "@reduxjs/toolkit"
import { Icredits } from "../Types/Icredits.t"
import CredentialsReducer, { LogoutReducer } from "../Reducers/CredentialsReducer"
import { DefaultCredits } from "../Common/DefaultCredits"
export  const Credits :Icredits = DefaultCredits
export const CredentialsSlice = createSlice({
    name:"Credentials",
    initialState:Credits,
    reducers:{CreditsInsertion:CredentialsReducer,Logout:LogoutReducer}
})
export const {CreditsInsertion,Logout} = CredentialsSlice.actions
export const Credentials = CredentialsSlice.reducer