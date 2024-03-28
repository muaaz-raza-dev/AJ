import { PayloadAction } from "@reduxjs/toolkit"
import { Icredits, IuserSchema } from "../Types/Icredits.t"
import { DefaultCredits } from "../Common/DefaultCredits";
interface  IcreditsPayload {
    isLoading?:boolean
    Info?:IuserSchema
    isLogined?:boolean
}

const CredentialsReducer = (state:Icredits,action:PayloadAction<IcreditsPayload>) => {
if(action.payload.isLogined!==undefined)state.isLogined=action.payload.isLogined;
if(action.payload.isLoading!==undefined)state.isLoading=action.payload.isLoading;
if(action.payload.Info!==undefined)state.Info = action.payload.Info
}

export const LogoutReducer = (state:Icredits,) => {
state.isLogined = false 
state.Info = DefaultCredits.Info
}
export default CredentialsReducer
