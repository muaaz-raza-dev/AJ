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
    photo:string;
    Role:"admin"|"chief admin"|"user";
    email:string;
    LastLogin:string[]
}