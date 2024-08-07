import { IShortTransactions } from "@/app/Types/ItransactionsRead";

export interface IfilteredTransactionsPdf {
   DateRangeDetails : {start:string;end:string }
   TotalTransactions:IShortTransactions[] 
}


   export interface IpurposeTransactionPdf{
     paymentTitle:string;paymentType:"Custom"|"Registered";paymentConfigId:string;month?:string;year?:string;session?:string 
   }