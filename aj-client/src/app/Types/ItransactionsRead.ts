import moment from "moment";

export interface IShortTransactions {
  _id:string;
  Invoice: number;
  Time: string;
  Student:{
    GRNO: string;
    FirstName: string;
  },
  PayorsName:string;
  RecievedBy:{Name:string},
  amount:{totalAmount: number};
  Transactions: [{ paymentTitle:string;paymentType:"Custom"|"Registered";paymentConfigId:string }];
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
  searchMode: string;
  year: string;
  month: string;
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
    isLoading: true,
  },
  Transactions: [],
  SearchModes: ["Invoice", "GR no"],
  TransactionTypes: [],
  q: "",
  Filters: {
    transactionType: "",
    searchMode: "Invoice",
    year: moment().year().toString(),
    month: "",
    Input: "",
    count: 1,
  },
};
