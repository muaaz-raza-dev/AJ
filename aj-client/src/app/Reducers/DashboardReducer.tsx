import { PayloadAction } from "@reduxjs/toolkit";
import { Iteacher } from "../Types/ITeacherRegisteration";
import { Iclass } from "../Types/Iclass";
import { Idashboard } from "../Types/Idashboard";

interface IdashboardPayload {
  //* dashboard = classes and teachers page
  detailed_payload?:{Class:{},Teacher:{}},
  payload?: {
    Teachers:{
      Original : {docs:Iteacher[],acedmic_role:string}[]
      Filtered : {docs:Iteacher[],acedmic_role:string}[]
    },
    Classes:{
      Original : Iclass[]
      Filtered : Iclass[]
    }
    };
    Filters?: {
      Sections: {
        available: ["Classes","Staffs"];
        selected: "Classes";
      };
      EmployementStatus: {
      available: string[];
      selected: string;
    };
    Session: {
      available: string[];
      selected: string;
    };
  };
  Detailed_Teacher ?:Iteacher|null;
  RequiredInfo ?: {
    Teachers ? :{[key:string]:string}
    Sessions ?:{[key:string] :{_id:string,isActive:boolean}}
  }
  RequiredPayload ?: {
    Teachers  :{[key:string]:string}
    Sessions :{[key:string] :{_id:string,isActive:boolean}}
  }
}

export const InsertBulkDashValuesFn = (
  state: Idashboard,
  { payload: {  payload, Filters ,RequiredInfo,RequiredPayload} }: PayloadAction<IdashboardPayload>
) => {
  if (payload) state.payload = payload;
  if (Filters) state.Filters = Filters;
  if(RequiredPayload) state.RequiredInfo =RequiredPayload
  if(RequiredInfo?.Teachers) state.RequiredInfo.Teachers =RequiredInfo.Teachers
  if(RequiredInfo?.Sessions) state.RequiredInfo.Sessions =RequiredInfo.Sessions
};

export const InsertDashPayloadFn = (
  state: Idashboard,
  {
    payload: { Original,Filtered,Detailed_Teacher,type,isLoading},
  }: PayloadAction<{
    type:"Teachers" 
    Original?: {docs:Iteacher[],acedmic_role:string}[] ;
    Filtered?: {docs:Iteacher[],acedmic_role:string}[] ;
    isLoading?:boolean
    Detailed_Teacher ?:Iteacher|null; }|{
    type :"Classes"
    ,Original?: Iclass[];
    Filtered?:  Iclass[];
    Detailed_Teacher ?:Iteacher|null;
    isLoading?:boolean

  } >
) => {
if(Original)state.payload[type].Filtered =Original
if(Filtered)state.payload[type].Original =Filtered
if(Detailed_Teacher)state.Detailed_Teacher=Detailed_Teacher
if(isLoading!=undefined) state.isLoading =isLoading

};

export const InsertDashFiltersFn = (
    state: Idashboard,  
    {
      payload: { fields_name,available,selected,isLoading},
     }: PayloadAction<{
      fields_name: "Session" | "EmployementStatus" |"Sections"
      available?: string[];
      selected?: string;
      isLoading?:boolean
    }>
  ) => {
if(available)state.Filters[fields_name].available =available
  if(selected)state.Filters[fields_name].selected =selected
  if(isLoading!=undefined) state.isLoading =isLoading
};

export const DashFilterBySearchFn = (
  state: Idashboard,
  {
    payload: { value ,isLoading},
  }: PayloadAction<{value:string ,
    isLoading?:boolean

  }
   >
) =>{
  if(isLoading!=undefined) state.isLoading =isLoading
  if(state.Filters.Sections.selected =="Classes") {}
  else{ 
    if(value)
{      
      
      let searchResults :any =state.payload.Teachers.Original.map(e=>
   {     
    
return {...e,docs:
e.docs.filter(doc=> {
      let name = doc.firstName.toLowerCase()+ " " +doc?.lastName.toLowerCase()
     return name.includes(value.toLowerCase()) 
     }) }
  }
    )
    state.payload.Teachers.Filtered =searchResults    
  } 

  }
}

export const ResetFiltersStateFn = (
  state: Idashboard,
  {
    payload: { type ,defaultState }
  }: PayloadAction<{type:"Classes" ,
     defaultState:Iclass[]
  }| {type:"Teachers",defaultState:{docs:Iteacher[],acedmic_role:string}[]
  }
   >
) =>{
state.payload[type].Filtered =defaultState
}


export const InputClassFilterFn = (
  state: Idashboard ,
  {
    payload: {input }
  }: PayloadAction<{
     input:string ,
  }
   > ) =>{
            state.payload.Classes.Filtered = state.payload.Classes.Original.filter(e=>e.name.toLowerCase().includes(input.toLowerCase()))
          
      
   }
