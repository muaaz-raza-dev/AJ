import { configureStore } from "@reduxjs/toolkit";
import { Credentials } from "./Slices/CredentialSlice";
import { StudentRegisteration } from "./Slices/StudentRegisterationSlice";
import { studentsDir } from "./Slices/StudentDirSlice";
import { globalState } from "./Slices/globalSlice";
import { TransactionCompose } from "./Slices/TransactionComposeSlice";
import { TransactionRead } from "./Slices/TransactionReadSlice";



export const Store = configureStore({
reducer:{
    credits:Credentials,
    StudentReg:StudentRegisteration,
    StudentsDir:studentsDir,
    global:globalState,
    transactions:TransactionRead,
    trCompose:TransactionCompose //tr =transaction
}
});

export type RootState = ReturnType <typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
