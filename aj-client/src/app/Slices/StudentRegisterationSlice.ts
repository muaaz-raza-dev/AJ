import {createSlice} from "@reduxjs/toolkit"
import { IstdRegisteration } from "../Types/IstdRegisteration.t"
import InsertStudentRegisterationState from "../Reducers/StudentRegisterationReducers"


export const StdRegisterationState :IstdRegisteration = {
 isEditStudent:false,
 SelectedFile:null,
 ImportedBulkData:[]
}
export const StudentRegSlice = createSlice({
    name:"Student Registeration",
    initialState:StdRegisterationState,
    reducers:{InsertToStudentsReg:InsertStudentRegisterationState}
})
export const {InsertToStudentsReg} = StudentRegSlice.actions
export const StudentRegisteration = StudentRegSlice.reducer