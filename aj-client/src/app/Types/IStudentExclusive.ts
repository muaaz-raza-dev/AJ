import { IShortTransactions } from "./ItransactionsRead";
import { IRegisterFormState } from "./IStdregisterForm.t";
export interface IstdExclusiveOverview {
    Transactions: IShortTransactions[],
    Dues: number;
    Student:IstudentExclusive; 
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
        _id:string;
        contact: string[];
        fatherName: string;
        DOB: string; // Consider using Date if you plan to work with date objects
        Gender: string;
        Address: string;
        GRNO: number;
        RollNo: number;
        CurrentSection:string;
        NewAdmission: boolean;
        CovidVaccine: boolean;
        sCNIC: number;
        fCNIC: number;
        mCNIC: number;
        WA: string;
        CurrentClass:string;
        DOA: string; // Consider using Date if you plan to work with date objects
        PolioPermission: boolean;
 }
export interface IstdExclusive {
    overview: IstdExclusiveOverview;
    Information : {isLoading:boolean,isError:string;Details:IRegisterFormState}; //edit part
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
    fatherName: '',
    DOB: '', // Consider using new Date().toISOString() if working with Date objects
    GRNO: 0,
    RollNo: 0,
    CurrentClass:'',
    DOA: '', // Consider using new Date().toISOString() if working with Date objects
    LastName: '', // Optional, provided for completeness
    photo: '', // Optional
    email: '', // Optional
    contact: [], // Optional, empty array as default
    Gender: '', // Optional
    Address: '', // Optional
    CurrentSection:'',
    fCNIC:"",
    mCNIC:"",
    sCNIC:"",
    NewAdmission: false, // Optional, defaulting to false
    CovidVaccine: false, // Optional, defaulting to false
    WA: null, // Optional
    PolioPermission: false ,
}



export const defaultStudentExclusiveDetails: IstdExclusive = {
    overview: {
        Transactions: [],
        Dues: 0, 
        Student: {
            FirstName: '',
            LastName: '',
            photo: '',
            email: '',
            contact: [],
            fatherName: '',
            DOB: '',
            Gender: '',
            Address: '',
            GRNO: 0,
            RollNo: 0,
            CurrentSection: '',
            NewAdmission: false,
            CovidVaccine: false,
            sCNIC: 0,
            fCNIC: 0,
            _id:'',
            mCNIC: 0,
            WA: '',
            CurrentClass: '',
            DOA: '',
            PolioPermission: false,
        }
    },
    Information:{isLoading:true,isError:"",Details:DefaultStudentExclusiveDetail},
    isLoading: true,
    isError: "",
    isFetched: false
};
