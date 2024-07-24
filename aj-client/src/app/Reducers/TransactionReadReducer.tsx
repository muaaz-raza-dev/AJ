import { PayloadAction } from "@reduxjs/toolkit"
import { IShortTransactions, ItransactionRead } from "../Types/ItransactionsRead"
interface  ItransactionReadOptional {
    TransactionStats?:{totalTransactions:number,PendingAmount:number,RecievedAmount:number,PendingTransactions:number,isLoading:boolean};
    SearchModes?: string[];
    TransactionTypes?: {value:string,label:string}[];
    Transactions?: IShortTransactions[];
    Filters?: ItransactionsFilters,
  isLoadingTransactions?:boolean,
  DataLength?:number
}
interface ItransactionsFilters{
    transactionType?: string;
    searchMode?: string;
    year?: string;
    month?: string;
    Input?: string;
    count?: number;}
const InsertTransactionsStateFn = (state:ItransactionRead,{payload:{DataLength,isLoadingTransactions,TransactionStats,SearchModes,TransactionTypes,Transactions}}:PayloadAction<ItransactionReadOptional>)=>{
    if(isLoadingTransactions!=undefined) state.isLoadingTransactions = isLoadingTransactions
    if(DataLength!=undefined) state.DataLength = DataLength
    if(TransactionStats!=undefined) state.TransactionStats=TransactionStats
    if(SearchModes!=undefined) state.SearchModes = SearchModes
    if(TransactionTypes!=undefined) state.TransactionTypes = TransactionTypes
    if(Transactions!=undefined) state.Transactions = Transactions
}
export const TransactionsFilterManagerFn =({Filters}:ItransactionRead,{payload:{transactionType,month,year,count,searchMode}}:PayloadAction<ItransactionsFilters>)=>{
if (transactionType!=undefined) Filters.transactionType =transactionType
if (month!=undefined) Filters.month =month
if (year!=undefined) Filters.year =year
if (count!=undefined) Filters.count =count
if (searchMode!=undefined) Filters.searchMode =searchMode
    
}

export default InsertTransactionsStateFn