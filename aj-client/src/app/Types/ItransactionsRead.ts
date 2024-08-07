export interface IShortTransactions {
  _id:string;
  Invoice: number;
  Time: string;
  Student:{
    GRNO: string;
    FirstName: string;
    LastName: string;
  },
  PayorsName:string;
  isDelayedRegistory?:boolean;
  RecievedBy:{Name:string},
  amount:{totalAmount: number};
  Transactions: {paymentTitle:string;paymentType:"Custom"|"Registered";paymentConfigId:string;
    month?:string;
    year?:string;
    session?:string }[];
}

export interface ItransactionRead {
  q: string;
  // Dates: { [key: string]: string[] };
  SearchModes: string[];
  TransactionTypes: {value:string,label:string}[];
  Transactions: IShortTransactions[];
  isLoadingTransactions:boolean;
  DataLength:number,
  TransactionStats: {
    totalTransactions: number;
    PendingAmount: number;
    RecievedAmount: number;
    PendingTransactions: number;
    isLoading: boolean;
  };
  Filters: ItransactionReadFilters;
}
export interface ItransactionReadFilters {
  transactionType: string;
  DateRange:{start:string;end:string},
  searchMode: string;
  Input: string;
  count: number;
}
export const defaultTransactionRead: ItransactionRead = {
  DataLength:0,
  isLoadingTransactions:true,
  TransactionStats: {
    totalTransactions: 0,
    PendingAmount: 0,
    RecievedAmount: 0,
    PendingTransactions: 0,
    isLoading: false,
  },
  Transactions: [],
  SearchModes: ["Invoice", "GR no"],
  TransactionTypes: [{value:"Registered",label:"Regsitered"},{value:"Custom",label:"Custom"},{value:"All",label:"All"}],
  q: "",
  Filters: {
    transactionType: "All",
    DateRange:{start: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
      },
    searchMode: "Invoice",
    Input: "",
    count: 1,
  },
};
