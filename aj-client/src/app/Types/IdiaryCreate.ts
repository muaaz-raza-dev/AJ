export interface IdiaryCreate {
    title:string;
    content:string;
    images:(string|File)[];
    tags:string[];
    classes:{class:string;sections:string[]}[];
    date?:string;
}

export const defaultIdiaryCreate :IdiaryCreate={
    title:"",
    content:"",
    images:[],
    tags:[],
    classes:[],
}