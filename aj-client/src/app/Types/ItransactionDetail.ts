
export interface ItransactionDetail { 
    id:string     ;
    Student: {FirstName : string;LastName:string , GRNO:string , }
    PayorsName:string,
    PaidAmount:number|string,
    amount:{
    realAmount:number,
    discount:number,
    totalAmount:number,
    }
    Note:string,
    Time:string,
    RecievedBy:{_id:string,Name:string};
    Invoice:string;
    isCancelled:boolean ;
    Transactions:ItransactionField_Detailed[]
}

export interface ItransactionField_Detailed {
    paymentType: "Custom"|"Registered",
    paymentConfigId ?: {session:{acedmic_year:string;session_name:string}},
    paymentTitle:String,
    month ?: string,
    session?:string, //For yearly payments
    year ?: string,
    amount:  {
      discount ?: number ,  //Just in numbers
      realAmount :number , //without discount 
      totalAmount:number  //After minusing the discount from real amount            
    
    } 

}

