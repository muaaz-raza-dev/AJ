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
    End_Date:string;
    Experience:string;
},
courses : string[] ,
schedule:{Start:string,End:string},
teaching_subjects : string[]
salary:number,
account_Details:{username:string;password:string,
    role:string
}
}
export const default_teacherReg:Iteacher = {
firstName:"",
lastName:"",
CNIC:"",
email:"",
wa:"",
phone:"",
photo:"",
qualification:{College:"",Degree:"",End_Date:"",Experience:""},
courses:[],
teaching_subjects:[],
    account_Details:{username:"",password:'',role:""},
salary:0,
address:"",
schedule:{Start:"",End:""}
}



