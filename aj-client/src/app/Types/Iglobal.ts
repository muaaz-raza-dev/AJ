export interface IglobalState  {
    Classes:{[key:string]:string} 
    Sections:{[key:string]:{[key:string]:string}}
    Sessions:{[key:string]:string} ;
    GlobalFees:{[key:string]:string} ;
    Expand_Navbar:boolean
}
export let DefaultGlobalState :IglobalState  = {
    Expand_Navbar:false ,
    Classes: {},
    Sections:{},
    Sessions:{} ,
    GlobalFees:{}

}