import {createSlice} from "@reduxjs/toolkit"
import { IstudentDir, StudentDirState } from "../Types/IstudentsDir.t"
import InsertStudentDirState, { InsertMoreStudentsData, SearchStudents, SearchedGlobal, SwitchClass } from "../Reducers/StudentsDirReducer"
export  const StudentsDir :IstudentDir = StudentDirState
export const CredentialsSlice = createSlice({
    name:"Students Dir",
    initialState:StudentsDir,
    reducers:{InsertStudentsDir:InsertStudentDirState,InsertStudents:InsertMoreStudentsData,SearchStudent:SearchStudents,SearchGlobal:SearchedGlobal,StudentsDirDefault:SwitchClass}
})
export const {InsertStudents,InsertStudentsDir,SearchStudent,SearchGlobal,StudentsDirDefault} = CredentialsSlice.actions
export const studentsDir = CredentialsSlice.reducer