export interface IglobalState  {
    totalStudents:number;
    classes:string[];
    Transaction_Config_update:boolean
}
export let DefaultGlobalState :IglobalState  = {
    totalStudents:0,
    Transaction_Config_update:false,
    classes:[]
}