import { configureStore } from "@reduxjs/toolkit";
import { Credentials } from "./Slices/CredentialSlice";
import { StudentRegisteration } from "./Slices/StudentRegisterationSlice";
import { studentsDir } from "./Slices/StudentDirSlice";
import { globalState } from "./Slices/globalSlice";
import { TransactionCompose } from "./Slices/TransactionComposeSlice";
import { TransactionRead } from "./Slices/TransactionReadSlice";
import { studentsExclusive } from "./Slices/StdExclusiveSlice";
import { Teacher_Details } from "./Slices/Teacher_Registeration_Edit_Slice";



export const Store = configureStore({
reducer:{
    credits:Credentials,
    StudentReg:StudentRegisteration,
    StudentsDir:studentsDir,
    global:globalState,
    transactions:TransactionRead,
    trCompose:TransactionCompose ,    //tr =transaction
    stdExclusive:studentsExclusive,  //student detailed page state
    teacher_details:Teacher_Details
}
});

export type RootState = ReturnType <typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
