export interface Iteacher {
firstName:string;
lastName :string;
CNIC :string ;
email:string ;
address:string;
photo:string ;
wa:string; //whatsapp_number
phone:string; //phone_number
qualification:{
    [key:string]:string ;
    Degree:string;
    Experience:string;
},
Date_Hire:string;
courses : string[] ,
schedule:{Start:string,End:string},
teaching_subjects : string[]
salary:number,
account_Details:{username:string;password:string,role:string},
acedmic_role:string
}
export const default_teacherReg:Iteacher = {
firstName:"",
lastName:"",
CNIC:"",
email:"",
wa:"",
phone:"",
photo:"",
qualification:{College:"",Degree:"",Experience:""},
Date_Hire:"",
courses:[],
teaching_subjects:[],
    account_Details:{username:"",password:'',role:""},
salary:1500,
address:"",
schedule:{Start:"",End:""} ,
acedmic_role:"Teacher"
}



