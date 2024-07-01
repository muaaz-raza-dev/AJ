import {createSlice} from "@reduxjs/toolkit"
import { default_teacherReg, Iteacher} from "../Types/ITeacherRegisteration"
import { InsertTeacherDetailsFn } from "../Reducers/Teacher_Registeration_Edit_Reducer"


export const TeacherRegisteration_Edit_State :Iteacher = default_teacherReg
export const StudentRegSlice = createSlice({
    name:"Student Registeration",
    initialState:TeacherRegisteration_Edit_State,
    reducers:{RedInsertTeacherDetails:InsertTeacherDetailsFn}
})
export const {RedInsertTeacherDetails} = StudentRegSlice.actions
export const Teacher_Details = StudentRegSlice.reducer