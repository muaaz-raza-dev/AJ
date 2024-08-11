export interface IaccountRegister{
    username:string;
    Name:string;
    Role:"admin"|"user";
    email:string;
    password:string;
    StaffId:string

}
export const defaultAccountRegisterState:IaccountRegister={
    email:"",
    Name:"",
    password:"",
    Role:"user",
    StaffId:"none",
    username:""
}