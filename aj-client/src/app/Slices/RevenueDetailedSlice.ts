import {createSlice} from "@reduxjs/toolkit"
import { defaultDetailedRevenue, IdetailedRevenue } from "../Types/IdetailedRevenue"
import { InsertFiltersFn, InsertPayloadFn } from "../Reducers/DetailedReveneReducer"
export  const GlobalState :IdetailedRevenue = defaultDetailedRevenue
export const DetailedRevenue = createSlice({
    name:"Session State",
    initialState:GlobalState,
    reducers:{RedDRInsertFilters:InsertFiltersFn, RedDRPayload:InsertPayloadFn}
})
export const {RedDRInsertFilters,RedDRPayload} = DetailedRevenue.actions
export const detailedRevenue = DetailedRevenue.reducer