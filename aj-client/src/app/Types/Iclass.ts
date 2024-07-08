import { Isessions } from "./Isessions";
import { IstudentShort } from "./IstudentsDir.t";
import { Iteacher } from "./ITeacherRegisteration";
export interface defaultId {
    _id?:string
}
export interface Iclass extends defaultId{

    name:string,
    sections:Array<Iclass_section>;
    subjects :string[]
    start_date : string;
    end_date?:string ;
    Students?:IstudentShort[]
    Session?:Isessions;
    SessionId:string ;   // * Yearly Session
}

export interface SubjectsTeacher {
    [key:string]:{
        subject:string
        Teachers:string[]
    }
}

export interface Iclass_section  extends defaultId{
    name: string;
    Class: string ; //Object Id
    ClassTeacher?: Iteacher;//Object Id
    Students: Array<string >;  //Object Id
    capacity: number;
    Subjects_teachers:SubjectsTeacher;
    start_date : string;
    end_date?:string ;
}

export const defaultSection_Class :Iclass_section = {
        name: "", 
        Class: "",
        Students: [],
        capacity: 0,
        Subjects_teachers:{},
        start_date : "" ,
}
export const defaultClass: Iclass = {
    name: "",
    SessionId:"",
    sections: [defaultSection_Class],
    subjects: [] ,
    start_date : "" ,
};
