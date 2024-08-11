import { Iclass } from "./Iclass";
import { Iteacher } from "./ITeacherRegisteration";

export interface Idashboard {  
  detailedPayload:{
    Class:{

    },
    Teacher:{},
  }         ,                        //* dashboard = classes and teachers page
    payload:{
      Teachers:{
        Original : {docs:Iteacher[],acedmic_role:string}[]
        Filtered : {docs:Iteacher[],acedmic_role:string}[]
      },
      Classes:{
        Original : Iclass[]
        Filtered : Iclass[]
      }
    },
    Detailed_Teacher :Iteacher|null;
    Filters :{
    Sections : {
        available:["Classes","Staffs"],
        selected:"Staffs"|"Classes"
    },
    EmployementStatus : {
        available:string[] ,
        selected:string
    } ,
    Session:{
        available:string[] ,
        selected:string
    },
    
},
RequiredInfo : {
  Teachers :{[key:string]:string}
  Sessions:{[key:string] :{_id:string,isActive:boolean}}
}
isLoading:boolean
}

export const defaultDashboard: Idashboard = {
  detailedPayload:{
    Class:{},Teacher:{}},
    payload: {
      Teachers: {
        Original: [], // Initially empty
        Filtered: [], // Initially empty
      }
      , Classes:{
        Original: [], // Initially empty
        Filtered: [], // Initially empty
      }
    },
    Detailed_Teacher : null,
    RequiredInfo : {Teachers:{},Sessions:{}},
    Filters: {
        Sections: {
          available: ["Classes","Staffs"],
          selected: 'Classes', // Default selection
        },
      EmployementStatus: {
        available: ['Current', 'Past'],
        selected: 'Current', // Default selection
      },
      Session: {
        available: [],
        selected: '', // Default selection
      },
    },
isLoading:false

  };






