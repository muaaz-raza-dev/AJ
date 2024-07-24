export interface IStaffInformationEditForm{
    firstName : string;
    lastName : string;
    photo : string;
    CNIC : string;
    email : string;
    phone : string;
    wa : string;
    address:string;
    acedmic_role:string;
    teaching_subjects:string[];
}
export const defaultStaffInformationEditForm:IStaffInformationEditForm= {
    firstName : "",
    lastName : "",
    photo : "",
    CNIC : "",
    email : "",
    phone : "",
    wa : "",
    address:"",
    acedmic_role:"",
    teaching_subjects:[]
}