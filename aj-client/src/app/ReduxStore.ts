import { configureStore } from "@reduxjs/toolkit";
import { Credentials } from "./Slices/CredentialSlice";
import { StudentRegisteration } from "./Slices/StudentRegisterationSlice";
import { studentsDir } from "./Slices/StudentDirSlice";
import { globalState } from "./Slices/globalSlice";
import { TransactionCompose } from "./Slices/TransactionComposeSlice";
import { TransactionRead } from "./Slices/TransactionReadSlice";
import { studentsExclusive } from "./Slices/StdExclusiveSlice";
import { Teacher_Details } from "./Slices/Teacher_Registeration_Edit_Slice";
import { dashboardSlice } from "./Slices/DashboardSlice";
import { LandingSessions } from "./Slices/SessionSlice";
import { Class_detailed } from "./Slices/ClassDetailedSlice";
import { lpaymentconfig } from "./Slices/LPaymentConfigSlice";
import { studentHist } from "./Slices/StudentHistorySlice";
import { Stats } from "./Slices/StatsSlice";
import { Fstats } from "./Slices/FilterableStatsSlice";
import { stdFeeReport } from "./Slices/StdFeeReportSlice";
import { detailedRevenue } from "./Slices/RevenueDetailedSlice";



export const Store = configureStore({
reducer:{
    credits:Credentials,
    StudentReg:StudentRegisteration,
    StudentsDir:studentsDir,
    global:globalState,
    transactions:TransactionRead,
    trComposeFilters:TransactionCompose ,    // tr =transaction
    stdExclusive:studentsExclusive,  //  student detailed page state
    teacher_details:Teacher_Details ,
    dashboard:dashboardSlice,
    sessions:LandingSessions ,
    classDetailed:Class_detailed ,
    paymentConfigsL:lpaymentconfig ,
    studentHistory:studentHist,
    stats: Stats,
    fStats:Fstats, // FilterableStats
    stdFeeReport,
    detailedRevenue
},
});

export type RootState = ReturnType <typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
