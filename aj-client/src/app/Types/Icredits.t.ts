export interface MongoDoc {
    _id:string
}

export interface Icredits  {
    isLogined:boolean;
    isLoading:boolean;
    Info:IuserSchema
}

export interface IuserSchema extends MongoDoc {
    username :string;
    Name:string;
    Role:"admin"|"cheif-admin"|"teacher";
    email:string;
    LastLogin:string[]
}