
export interface ItransactionField {
        paymentType: "Custom"|"Registered",
        paymentConfigId ?: string,
        paymentTitle:String,
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