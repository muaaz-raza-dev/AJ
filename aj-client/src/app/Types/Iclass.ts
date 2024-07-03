
export interface Iclass {
    name:string,
    sections:Array<Iclass_section>;
    subjects :string[]
}

export interface SubjectsTeacher {
    [key:string]:{
        subject:string
        Teachers:string[]
    }
}

export interface Iclass_section  {
    name: string;
    Class: string ; //Object Id
    ClassTeacher: string;//Object Id
    Students: Array<string >;  //Object Id
    capacity: number;
    Subjects_teachers:SubjectsTeacher;
}

export const defaultSection_Class :Iclass_section = {
        name: "", 
        Class: "",
        ClassTeacher: "",
        Students: [],
        capacity: 0,
        Subjects_teachers:{}
    
}
export const defaultClass: Iclass = {
    name: "",
    sections: [defaultSection_Class],
    subjects: []
};
