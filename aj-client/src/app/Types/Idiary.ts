import moment from "moment";

export interface IdiaryPageState {
    filters: {
        selected: { date: string; session: string; Class: string; section: string };
        available: { sessions: { [key: string]: string }; classes: { [key: string]: { [key: string]: string } }; sections: { [key: string]: { [key: string]: string } } }
        //? sessions : {sessionId:year/name} 
        //? classes: {sessionId:{classId:className,classId2:className}}
        //? sections: {classId:{sectionId:sectionName,sectionId2:sectionName}}
    };

    diaries: Array<Idiary>;
    isLoading: boolean;
}
export interface Idiary {
    _id: string;
    content: string;
    title: string;
    images: Array<string>;
    tags: Array<string>;
    publishedBy: { Name: string };
    date: Date;
    seenBy:{FirstName:string;LastName:string;photo:string;GRNO:string}[]
}

export const defaultIdiaryPageState: IdiaryPageState = {
    filters: {
        selected: { date: moment().format('YYYY-MM-DD'), session: '', Class: '', section: '' },
        available: {
            sessions: {},
            classes: {},
            sections: {}
        }
    },
    diaries: [],
    isLoading: false
};