
export interface ItransactionField {
        paymentType: "Custom"|"Registered",
        paymentConfigId ?: string,
        paymentTitle:string,
        month ?: string,
        sessionId?:string, //For yearly payments
        year ?: string,
        amount:  {
          discount ?: number ,  //Just in numbers
          realAmount :number , //without discount 
          totalAmount:number  //After minusing the discount from real amount            
        
} 
}

export interface ItransactionForm{
PayorsName:string,
Time:string;
PaidAmount:number|string,
amount:{
realAmount:number,
discount:number,
totalAmount:number,
}
Note:string,
Student:string,
Invoice:string;
Transactions:ItransactionField[]
}


export const defaultTransactionForm: ItransactionForm = {
  PayorsName: '',
  PaidAmount:"",
  Time: '',  // For delayed Registory 
  amount:{
    realAmount:0,
    discount:0,
    totalAmount:0,
  },
  Note: '',
  Student: '',
  Invoice: '',
  Transactions: [],
};