export interface IstatCharts{
    payload:{
        monthly:{chartData: ImonthlyStats[]; average:number //average per month 
             };
        daily: {
            chartData: IdailyStats[]; average:number // average per day
        }
    },
    filters:{
        monthly:{available:string[],selected:string;
            isLoading:boolean,

        };
        daily:{
            isLoading:boolean,
            available:{[key:string]:string[]}
            selected:{year:string;month:string}
    },
}

}

export interface ImonthlyStats{month:string,amount:1000,year:string}
export interface IdailyStats{amount:1000,day:number}

export const defaultIstatCharts: IstatCharts = {
    payload: {
        monthly: {
            chartData: [],
            average: 0, // average per month
        },
        daily: {
            chartData: [],
            average: 0, // average per day
        },
    },
    filters: {
        monthly: {
            available: ["3 months","6 months","12 months"],
            selected: '3 months',
            isLoading: false,
        },
        daily: {
            available: {},
            selected: { year: '', month: '' },
            isLoading: false,
        },
    },
};