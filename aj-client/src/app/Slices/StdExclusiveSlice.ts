import {createSlice} from "@reduxjs/toolkit"

import { defaultStudentExclusiveDetails, IstdExclusive } from "../Types/IStudentExclusive"
import { InsertStdExclusiveFn, InsertStudentsInformationFn } from "../Reducers/StudentExclusiveReducer"
export  const StudentsDir :IstdExclusive = defaultStudentExclusiveDetails
export const CredentialsSlice = createSlice({
    name:"Students exclusive",
    initialState:StudentsDir,
    reducers:{RedInsertStudentOverview:InsertStdExclusiveFn,
        RedInsertStdInformation:InsertStudentsInformationFn
    }
})
export const {RedInsertStudentOverview,RedInsertStdInformation} = CredentialsSlice.actions
export const studentsExclusive = CredentialsSlice.reducer