import { PayloadAction } from "@reduxjs/toolkit";
import { Iteacher } from "../Types/ITeacherRegisteration";
interface IteacherDetails_payload {
    firstName?:string ;
    lastName ?:string;
    CNIC ?:string ;
    email?:string ;
    address?:string;
    photo?:string ;
    wa?:string; //whatsapp_number
    phone?:string; //phone_number
    qualification?:{
        [key:string] :string ;
        Degree:string;
        End_Date:string;
        Experience:string;
    },
    courses ?: string[] ,
    schedule?:{Start:string,End:string},
    teaching_subjects ?: string[]
    salary?:number,
    role:string,
    account_Details?:{username:string;password:string,role:string}
}
export const InsertTeacherDetailsFn  = (state:Iteacher,{payload:{firstName,role,lastName,CNIC,email,address,photo,wa,phone,qualification,courses,salary,schedule,account_Details,teaching_subjects}}:PayloadAction<IteacherDetails_payload>) =>{
    if(firstName) state.firstName = firstName
    if(lastName) state.lastName = lastName
    if(CNIC) state.CNIC = CNIC
    if(email) state.email = email
    if(photo) state.photo = photo
    if(wa) state.wa = wa
    if(qualification) state.qualification = qualification
    if(courses) state.courses = courses
    if(address) state.address = address
    if(schedule) state.schedule = schedule
    if(salary) state.salary = salary
    if(account_Details) state.account_Details = account_Details
    if(phone) state.phone = phone
    if(teaching_subjects) state.teaching_subjects = teaching_subjects

}