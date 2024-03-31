import moment from "moment";

export interface IShortTransactions {
  Invoice: number;
  Time: string;
  Student:{
    GRNO: string;
    FirstName: string;
  }
  RecievedBy:{Name:string},
  totalAmount: number;
  Transactions: [{ [key: string]: any }];
}

export interface ItransactionRead {
  q: string;
  Dates: { [key: string]: string[] };
  SearchModes: string[];
  TransactionTypes: { type: string; numberOfTransactions: number }[];
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
  Dates: {},
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
