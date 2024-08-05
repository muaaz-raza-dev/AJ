
export interface IclassPaymentConfig{
Configs: {
    Config:{feeStatus:"Same amount for every Class"|"Different amount for every Class",feeTitle:string;_id:string;feeFrequency:"One Time"|
        "Monthly" | "Yearly" |"Custom"
    }; 
    class:{amount:number;classId:string}
}[]
}

export const DefaultClassPaymentConfig : IclassPaymentConfig= {Configs:[]}