export interface IglobalState  {
    Classes:{[key:string]:string} 
    Sections:{[key:string]:{[key:string]:string}}
    Sessions:{[key:string]:string} ;
    GlobalFees:{[key:string]:string} ;
    Expand_Navbar:boolean;
    DarkMode:boolean;
    AdvancedSettings:IadvancedActions
}

export interface IadvancedActions{
    autoGR:boolean;
    sortGR:boolean;
    isStdBlocked:boolean;
    isTemporaryBlocked:boolean;
}
export const DefaultGlobalState :IglobalState  = {
    Expand_Navbar:false ,
    Classes: {},
    AdvancedSettings:{autoGR:false,sortGR:false,isTemporaryBlocked:false,isStdBlocked:false},
    Sections:{},
    Sessions:{} ,
    GlobalFees:{},
    DarkMode: localStorage.getItem("DarkMode")? JSON.parse(localStorage.getItem("DarkMode")||"") : false
}