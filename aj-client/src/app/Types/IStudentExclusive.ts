import moment from "moment";
import { IShortTransactions } from "./ItransactionsRead";
import { IRegisterFormState } from "./IStdregisterForm.t";
export interface IstdExclusiveOverview {
    Transactions: IShortTransactions[],
    Dues: number;
    FeeCleared: boolean;//Fee clear for this month
    Student: {
        Class: string;
        GRNO: number;
        FirstName: string;
        LastName: string;
        DOA: string;
        photo: string;
    },
}
export interface IstdExFeeSection {
    Filters: {
        Filters: { Years: string[], FeeTypes: string[] },
        AppliedFilters: { Year: string; FeeType: string } // we'll send selectedFilters object to server 
    },
    isLoading:boolean,
    isError:string,
    FeeCollection:IfeeDoc[]
}
export interface IstudentExclusive{
        FirstName: string;
        LastName: string;
        photo: string;
        email: string;
        contact: string[];
        fatherName: string;
        DOB: string; // Consider using Date if you plan to work with date objects
        Gender: string;
        Address: string;
        GRNO: number;
        RollNo: number;
        Section: string;
        NewAdmission: boolean;
        CovidVaccine: boolean;
        sCNIC: number;
        fCNIC: number;
        mCNIC: number;
        WA: string;
        Class: string;
        DOA: string; // Consider using Date if you plan to work with date objects
        PolioPermission: boolean;
        FinancialDetails :{
            AdmissionFee:{amount:number|null,paid:boolean};
            MonthlyFee:number|null;
            AnnualCharges:number|null;
        }
 }
export interface IstdExclusive {
    overview: IstdExclusiveOverview;
    Fees: IstdExFeeSection;
    Information : {isLoading:boolean,isError:string;Details:IRegisterFormState};
    isLoading: boolean;
    isFetched: boolean;
    isError: string;

}
export interface IfeeDoc { 
     month: string;
     isSubmited: false;
     hasPassedMonth: boolean; //This will ensure that the month is passed or not i.e (currentMonth+1)month fee hasPassedMonth:false;
     FeeDetail:{Invoice:number;totalAmount:number;Time:string;};
     isAdmitted:boolean
}




const DefaultStudentExclusiveDetail:IRegisterFormState ={
    FirstName: '',
    FinancialDetails:{
        AdmissionFee:{amount:null,paid:true},
        MonthlyFee:null,
        AnnualCharges:null,
    },
    fatherName: '',
    DOB: '', // Consider using new Date().toISOString() if working with Date objects
    GRNO: 0,
    RollNo: 0,
    Class: '',
    DOA: '', // Consider using new Date().toISOString() if working with Date objects
    LastName: '', // Optional, provided for completeness
    photo: '', // Optional
    email: '', // Optional
    contact: [], // Optional, empty array as default
    Gender: '', // Optional
    Address: '', // Optional
    Section: '', // Optional
    NewAdmission: false, // Optional, defaulting to false
    CovidVaccine: false, // Optional, defaulting to false
    sCNIC: 0, // Optional
    fCNIC: 0, // Optional
    mCNIC: 0, // Optional
    WA: null, // Optional
    PolioPermission: false ,
}



export const defaultStudentExclusiveDetails: IstdExclusive = {
    overview: {
        Transactions: [],
        Dues: 0,
        FeeCleared: false,
        Student: {
            photo: '',
            DOA: '',
            Class: '',
            GRNO: 0,
            FirstName: "",
            LastName: ""
        },
    },
    Fees: {
        Filters: { Filters: { Years: [], FeeTypes: [] }, AppliedFilters: { Year: moment().year().toString(), FeeType: "" } } ,
        FeeCollection:[],
        isLoading:false,
        isError:"",
    },
    Information:{isLoading:true,isError:"",Details:DefaultStudentExclusiveDetail},
    isLoading: true,
    isError: "",
    isFetched: false
};
