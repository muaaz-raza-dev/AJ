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
GRNO:number;
RollNo:number|null;
Section:string;
NewAdmission:boolean;
WA:string|null;
fCNIC:string |null;
mCNIC:string |null;
sCNIC:string |null;
Class:string;
DOA:string //Date of Admission
PolioPermission?:boolean;
CovidVaccine?:boolean;
FinancialDetails :{
    AdmissionFee:{amount:number,paid:boolean};
    MonthlyFee:number|null;
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
    GRNO: 0,
    RollNo: null,
    Section: '',
    NewAdmission: false,
    Class: '',
    DOA: '',
    PolioPermission: true,
    CovidVaccine:false,
    FinancialDetails:{
        AdmissionFee:{amount:0,paid:true},
        MonthlyFee:0,
    }
  };





