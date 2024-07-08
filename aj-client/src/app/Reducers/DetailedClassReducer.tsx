import { PayloadAction } from "@reduxjs/toolkit";
import { Iclass_detailed, Iclass_detailed_payload } from "../Types/Iclass_detailed";



interface Ipayload {
    payload?:Iclass_detailed_payload;
}
export const InsertPayloadFn = (
    state: Iclass_detailed,
    { payload:{payload} }: PayloadAction<Ipayload>
  ) =>{
    if(payload) state.payload =payload
}

export const InsertFiltersFn =
 (state:Iclass_detailed , {payload:{type,selected_index}}:PayloadAction<{type:"Sections",selected_index:number}>)=>{
    if(selected_index!=undefined ) state.Filters[type].selected_index=selected_index
}