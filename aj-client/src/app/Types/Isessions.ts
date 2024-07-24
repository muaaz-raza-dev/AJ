import { Iclass } from "./Iclass";

export interface Isessions {
isActive:boolean;  // Assuming "Active" is the default status
end_date:string;
start_date:string;
acedmic_year:string;
session_name:string;
session_description:string;
createdBy:{name:string,_id:string},
Classes:Iclass[]
}

export const defaultSession: Isessions = {
    isActive:true, 
    end_date: "",
    start_date: "",
    acedmic_year: "",
    session_name: "",
    session_description:"",
    createdBy:{name:"",_id:""},
    Classes:[]
};

export interface IlandingSessions  {
  payload:{
    Sessions:{
      Original : Isessions[]
      Filtered : Isessions[]
    }
  } ,
  isLoading:boolean
}


export const defaultLandingSessions: IlandingSessions = {
  payload: {
    Sessions: {
      Original: [],
      Filtered: [],
    },
  },
  isLoading: false,
};