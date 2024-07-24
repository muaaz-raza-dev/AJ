export interface IRegisterFormState {
FirstName:string;
LastName:string;
photo:string|File;
email:string;
contact:string[]
fatherName:string;
DOB:string;
Gender:string;
Address:string;
GRNO:number|string;
RollNo:number|null;
CurrentSection:string;
NewAdmission:boolean;
WA:string|null;
fCNIC:string |null;
mCNIC:string |null;
sCNIC:string |null;
CurrentClass:string;
DOA:string //Date of Admission
PolioPermission?:boolean;
CovidVaccine?:boolean;
ConsiderOneTimeFee?:boolean;
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
    CurrentSection: '',
    NewAdmission: false,
    CurrentClass: '',
    DOA: '',
    PolioPermission: true,
    CovidVaccine:false,
  };





