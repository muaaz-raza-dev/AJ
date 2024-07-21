export interface IstudentShort {
    _id:string;
    FirstName:string;
    LastName:string;
    photo:string;
    fatherName:string;
    RollNo:number;
    GRNO:string;
    DOA:string;
    CurrentSection:string;
    email:string;
    contact:string[]
    CurrentClass:string;
    WA:string

}

export interface IstudentDir{
    StudentsData : {[key : string]:IstudentShort[]};
    MutableData:IstudentShort[];
    count:number;
    totalPages?:number;
    classes:string[]
    SelectedClass:string;
    SearchMode:string;
    isLoading:boolean;
    isNotExists:boolean; //To check wheter it is loaded in frontend or not
    isNotFound:boolean;
    totalStudents:number;
    Filters:{Class:string,Polio:boolean,Covid:boolean}
}

export let StudentDirState :IstudentDir= {
    StudentsData:{},
    MutableData:[],
    Filters:{Class:"All",Polio:false,Covid:false},
    count:1,
    isNotExists:false,
    classes:[],
    SelectedClass:"",
    SearchMode:"Name",
    isLoading:true,
    totalStudents :0,
    isNotFound:false
 }