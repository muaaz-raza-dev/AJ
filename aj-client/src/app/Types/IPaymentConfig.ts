import { IpaymentMonths } from "@/Pages/Payments/Config/Sections/components/Sections/MonthsPay_Red.pay";

interface IpaymentConfig {
    feeTitle: string;
    session?: string; // Reference to YearlySession
    feeDescription?: string; // Optional
    feeFrequency: 'Monthly' | 'Yearly' | 'One Time' | "Custom"; // Required
    feeStatus: 'Same amount for every Class' | 'Different amount for every Class'; // Required
    classes: Array<{
        classId: string; // Reference to Classes
        amount: number;
    }>; // Required
    paymentMonths?: Array<{
        year: string;
        month: string;
    isPayment: boolean;
        dueDate: string; // Required
        paymentDate: string; // Required
    }>; // Optional
    paymentDate?:string,
    dueDate?:string ;
    feeAmount?:string;
}


export interface IpaymentRegisterationState {
    payload: IpaymentConfig;
    isLoading: boolean;
    filters: {
        paymentMonths?:{[key:string]:IpaymentMonths[]};
        feeTypes:["Monthly" ,"Yearly" , "One Time","Custom"];
        feeStatuses: ["Same amount for every Class", "different amount for every Class"];
        paymentTime?:["Admission"],
        sessions: {
            available: { _id: string, label: string ,start_date: string; end_date: string;  }[]; //Selected session will go directly to the main payload state
            SelectedSession?: {
                _id: string; start_date: string; end_date: string; 
            },
            Classes: {[key:string] //represnt the session id 
                :{ _id: string, label: string }[]}

        }

    }
}

export const defaultPaymentRegisterationConfig: IpaymentRegisterationState = {
 isLoading: false,
    filters: {sessions:{available:[],Classes:{}},feeTypes:["Monthly" ,"Yearly" , "One Time","Custom"],
    feeStatuses: ["Same amount for every Class", "different amount for every Class"]
},
    payload:{
        feeTitle: '',
        feeFrequency: 'Monthly', // Default to 'Monthly' but should be updated based on use case
        feeStatus: 'Same amount for every Class', // Default to 'Same for every Class' but should be updated based on use case
        classes: [],
        paymentMonths: []
    }
};

export default IpaymentConfig;
