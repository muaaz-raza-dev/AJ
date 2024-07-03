import { Iclass } from "./Iclass";
import { Iteacher } from "./ITeacherRegisteration";

export interface Idashboard {                                   //* dashboard = classes and teachers page
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
        available:string[],
        selected:string
    },
    EmployementStatus : {
        available:string[] ,
        selected:string
    } ,
    Year:{
        available:string[] ,
        selected:string
    },
    
},
Teachers_value_pairs :{[key:string]:string}
isLoading:boolean
}

export const defaultDashboard: Idashboard = {
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
    Teachers_value_pairs:{},
    Filters: {
        Sections: {
          available: [ 'Classes',"Teachers"],
          selected: 'Classes', // Default selection
        },
      EmployementStatus: {
        available: ['Current', 'Past'],
        selected: 'Current', // Default selection
      },
      Year: {
        available: [],
        selected: '', // Default selection
      },
    },
isLoading:false

  };






