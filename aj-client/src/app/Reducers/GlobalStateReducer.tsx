import { PayloadAction } from "@reduxjs/toolkit"
import { IglobalState } from "../Types/Iglobal";
interface  IPayload {
    totalStudents?:number;
    classes?:string[]
}

const InsertGlobalStateReducer = (state:IglobalState,{payload}:PayloadAction<IPayload>) => {
      
    if (payload.totalStudents!=undefined)state.totalStudents=payload.totalStudents
    if (payload.classes!=undefined)state.classes=payload.classes
}


export default InsertGlobalStateReducer