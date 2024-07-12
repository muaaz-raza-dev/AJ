import {createSlice} from "@reduxjs/toolkit"
import { defaultIpaymentconfigLanding, IpaymentconfigLanding } from "../Types/IpaymentLanding"
import { FilterSettingsFn, InsertpayloadFn } from "../Reducers/LpaymentConfigReducer"
export  const GlobalState :IpaymentconfigLanding = defaultIpaymentconfigLanding
export const CredentialsSlice = createSlice({
    name:"Global State",
    initialState:GlobalState,
    reducers:{RedLPFilters:FilterSettingsFn,RedLPpayload:InsertpayloadFn}
})
export const {RedLPFilters,RedLPpayload} = CredentialsSlice.actions
export const lpaymentconfig = CredentialsSlice.reducer