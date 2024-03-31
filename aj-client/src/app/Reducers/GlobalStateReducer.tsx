import { PayloadAction } from "@reduxjs/toolkit"
import { IglobalState } from "../Types/Iglobal";
interface  IPayload {
    totalStudents?:number;
    classes?:string[];
    Transaction_Config_update?:boolean
}

const InsertGlobalStateReducer = (state:IglobalState,{payload}:PayloadAction<IPayload>) => {
      
    if (payload.totalStudents!=undefined)state.totalStudents=payload.totalStudents
    if (payload.Transaction_Config_update!=undefined)state.Transaction_Config_update=payload.Transaction_Config_update
    if (payload.classes!=undefined)state.classes=payload.classes
}


export default InsertGlobalStateReducer