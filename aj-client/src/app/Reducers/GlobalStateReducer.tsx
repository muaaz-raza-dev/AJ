import { PayloadAction } from "@reduxjs/toolkit"
import { IglobalState } from "../Types/Iglobal";
interface  IPayload {
    Classes?:{[key:string]:string}
    Sections?:{[key:string]:{[key:string]:string}}
    Sessions?:{[key:string]:string} ;
    GlobalFees?:{[key:string]:string} ;
    Expand_Navbar?:boolean
}

const InsertGlobalStateReducer = (state:IglobalState,{payload:{Classes,Sections,Sessions,Expand_Navbar,GlobalFees}}:PayloadAction<IPayload>) => {
if(Classes) state.Classes = Classes
if(GlobalFees) state.GlobalFees = GlobalFees
if(Sections) state.Sections = Sections
if(Sessions) state.Sessions = Sessions
if(Expand_Navbar!=undefined) state.Expand_Navbar = Expand_Navbar
}


export default InsertGlobalStateReducer