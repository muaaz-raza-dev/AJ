export interface IaccountInfo {
    Info :{
        username:string;
        Role:string;
        photo:string; // photo url
    };
    isVerified:boolean ; // to check the username verification in case of changes
    isUpdatePassword : boolean ; // to check wheter if the user wants to update the password or not
    Passwords:{
        currentPassword:string;
        newPassword:string;
    } ,
    isLoaded:boolean;   

}




export const defaultAccountInfo :IaccountInfo ={
    Info: {
        username: '',
        Role: '' ,
        photo:''
    },
    isLoaded:false,
    isVerified: false,
    isUpdatePassword: false,
    Passwords: {
        currentPassword: '',
        newPassword: ''
    }
}



