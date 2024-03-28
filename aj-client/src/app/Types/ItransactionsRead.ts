export interface IShortTransactions{
  Invoice:number,
  Date:string,
  GRNO:string,
  Name:string,
  totalAmount:number,
  Transactions:[{[key:string]:any}]  
}

export interface ItransactionRead{
  q:string,
   Dates:{[key:string]:string[]}
    SearchModes:string[];
    TransactionTypes:string[];
    Transactions: IShortTransactions[]
    TransactionStats:{totalTransactions:number,PendingAmount:number,RecievedAmount:number,PendingTransactions:number,isLoading:boolean};
    Filters:{transactionType:string;searchMode:string;year:string;month:string;Input:string;count:number;}
}
export const defaultTransactionRead: ItransactionRead = {
    Dates:{},
    TransactionStats:{totalTransactions: 0,PendingAmount: 0,RecievedAmount: 0,PendingTransactions:0,isLoading:true},
    Transactions:[],
    SearchModes: [],
    TransactionTypes: [],
    q:"",
    Filters: {transactionType: "",searchMode: "",year: "",month: "",Input: "",count: 0}
};