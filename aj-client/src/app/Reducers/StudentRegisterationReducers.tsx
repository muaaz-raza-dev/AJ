import { PayloadAction } from "@reduxjs/toolkit"
import { IstdRegisteration } from "../Types/IstdRegisteration.t";
interface  IPayload {
    isEditStudent?:boolean;
    SelectedFile ?: File|null;
    ImportedBulkData ?: {[key:string]:any}[]
}

const InsertStudentRegisterationState = (state:IstdRegisteration,action:PayloadAction<IPayload>) => {
if(action.payload.isEditStudent!==undefined)state.isEditStudent=action.payload.isEditStudent;
if(action.payload.SelectedFile!==undefined)state.SelectedFile=action.payload.SelectedFile;
if(action.payload.ImportedBulkData!==undefined)state.ImportedBulkData = action.payload.ImportedBulkData
}


export default InsertStudentRegisterationState
