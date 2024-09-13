import { PayloadAction } from "@reduxjs/toolkit"
import { IglobalState } from "../Types/Iglobal";
interface  IPayload {
    Classes?:{[key:string]:string};
    Sections?:{[key:string]:{[key:string]:string}};
    Sessions?:{[key:string]:string} ;
    GlobalFees?:{[key:string]:string} ;
    Expand_Navbar?:boolean;
    DarkMode?:boolean;
    AdvancedActions?:{autoGR?:boolean,sortGR?:boolean;isTemporaryBlocked?:boolean;isStdBlocked?:boolean};
}

const InsertGlobalStateReducer = (state:IglobalState,{payload:{Classes,AdvancedActions,DarkMode,Sections,Sessions,Expand_Navbar,GlobalFees}}:PayloadAction<IPayload>) => {
if(Classes) state.Classes = Classes
if(GlobalFees) state.GlobalFees = GlobalFees
if(Sections) state.Sections = Sections
if(Sessions) state.Sessions = Sessions
if(Expand_Navbar!=undefined) state.Expand_Navbar = Expand_Navbar
if(DarkMode!=undefined) state.DarkMode = DarkMode
if(AdvancedActions) {
if(AdvancedActions.autoGR!=undefined) state.AdvancedSettings.autoGR =AdvancedActions.autoGR; 
if(AdvancedActions.sortGR!=undefined) state.AdvancedSettings.sortGR =AdvancedActions.sortGR; 
if(AdvancedActions.isTemporaryBlocked!=undefined) state.AdvancedSettings.isTemporaryBlocked =AdvancedActions.isTemporaryBlocked;
if(AdvancedActions.isStdBlocked!=undefined) state.AdvancedSettings.isStdBlocked =AdvancedActions.isStdBlocked;
}
}

export default InsertGlobalStateReducer