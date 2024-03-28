export interface IRegisterFormState {
FirstName:string;
LastName:string;
photo:string;
email:string;
contact:string[]
fatherName:string;
DOB:string;
Gender:string;
Address:string;
GRNO:string;
RollNo:number|null;
Section:string;
NewAdmission:boolean;
WA:number|null;
fCNIC:number |null;
mCNIC:number |null;
sCNIC:number |null;
Class:string;
DOA:string //Date of Admission
PolioPermission?:boolean;
CovidVaccine?:boolean;
FinancialDetails :{
    AdmissionFee:number|null;
    MonthlyFee:number|null;
    AnnualCharges?:number|null;
}
}
export const defaultRegisterFormState: IRegisterFormState = {
    FirstName: '',
    WA:null,
    LastName: '',
    photo: '',
    fCNIC:null,
mCNIC:null,
sCNIC:null,
    email: '',
    contact: [],
    fatherName: '',
    DOB: '',
    Gender: 'male',
    Address: '',
    GRNO: '',
    RollNo: null,
    Section: '',
    NewAdmission: false,
    Class: '',
    DOA: '',
    PolioPermission: true,
    CovidVaccine:false,
    FinancialDetails:{
        AdmissionFee:null,
        MonthlyFee:null,
        AnnualCharges:null,
    }
  };





