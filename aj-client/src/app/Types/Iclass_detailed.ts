import { defaultId } from "./Iclass";
import { Isessions } from "./Isessions";
import { IstudentShort } from "./IstudentsDir.t";
import { Iteacher } from "./ITeacherRegisteration";
export interface Iclass_detailed_payload extends defaultId{
        name:string ,
        subjects:string[]; 
        Students:IstudentShort[];
        Session?:Isessions;
        sections:Iclass_section[];
        start_date:string;
        end_date?:string;

}
interface Iclass_section extends defaultId{
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
        subjects: [],
        Students: [],
        sections: [],
        start_date: "",
        end_date: ""
    } ,
    Filters:{Sections:{selected_index:0}}
};