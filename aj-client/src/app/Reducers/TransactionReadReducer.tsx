import { PayloadAction } from "@reduxjs/toolkit"
import { IShortTransactions, ItransactionRead } from "../Types/ItransactionsRead"
interface  ItransactionReadOptional {
    Dates?:{[key:string]:string[]};
    TransactionStats?:{totalTransactions:number,PendingAmount:number,RecievedAmount:number,PendingTransactions:number,isLoading:boolean};
    SearchModes?: string[];
    TransactionTypes?: string[];
    Transactions?: IShortTransactions[];
    Filters?: {
        transactionType: string;
        searchMode: string;
        year: string;
        month: string;
        Input: string;
        count: number;
    };
}
const InsertTransactionsStateFn = (state:ItransactionRead,{payload:{Filters,Dates,TransactionStats,SearchModes,TransactionTypes,Transactions}}:PayloadAction<ItransactionReadOptional>)=>{
    console.log(TransactionStats);
    if(Filters!=undefined) state.Filters = Filters
    if(TransactionStats!=undefined) state.TransactionStats=TransactionStats
    if(Dates!=undefined) state.Dates = Dates 
    if(SearchModes!=undefined) state.SearchModes = SearchModes
    if(TransactionTypes!=undefined) state.TransactionTypes = TransactionTypes
    if(Transactions!=undefined) state.Transactions = Transactions
}

export default InsertTransactionsStateFn