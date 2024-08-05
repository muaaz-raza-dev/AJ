import { defaultId } from "./Iclass";
import { Isessions } from "./Isessions";
import { IstudentShort } from "./IstudentsDir.t";
import { Iteacher } from "./ITeacherRegisteration";
export interface Iclass_detailed_payload extends defaultId{
        name:string ,
        Students:IstudentShort[];
        Session?:Isessions;
        sections:Iclass_section[];
        start_date:string;
        end_date?:string;
        PaymentConfigDetails:IclassPaymentDetails[]
        isPaymentConfigUpdate:boolean
    }

export interface IclassPaymentDetails  {
feeTitle :string;
feeStatus:string;
class:{classId:string;amount:string}|null
_id:string;
}
    interface Iclass_section extends defaultId{
    subjects:string[]; 
    name: string;
    Class: string ; //Object Id
    ClassTeacher?: Iteacher;//Object Id
    Students: Array<string >;  //Object Id
    capacity: number|string;
    Subjects_teachers:Iclass_section_teachers[];
    start_date : string;
    end_date?:string ;
}
export interface Iclass_section_teachers  {
    Teachers:Iteacher[],
    subject:string
}
export interface Iclass_detailed {
payload :Iclass_detailed_payload
Filters:{Sections: {selected_index:number}}
}
export const default_classDetailed: Iclass_detailed = {
    payload :{
        name: "",
        Students: [],
        sections: [],
        start_date: "",
        end_date: "" ,
        isPaymentConfigUpdate:false,
        PaymentConfigDetails:[]
    } ,
    Filters:{Sections:{selected_index:0}}
};