import { defaultId } from "./Iclass";

export interface Ipayment_config_short extends defaultId{
    feeTitle: string;
    feeDescription: string;
    feeStatus: string;
    session: string; 
    feeFrequency: string;
    Installments: string;
    feeScope: string;
    feeAmount?:string;
    createdAt: string;
    classes: { name: string; amount: number;}[];  //classes
}

export interface IpaymentconfigLanding {
    payload : Ipayment_config_short[] ;
    isLoading: boolean;
    register:{isLoading:boolean} // for the edit and register payment page
    filters: {sessions:{available:{label:string,value:string}[],selected:string} ; feeScopes:{available:string[],selected:string}}
}

export const defaultIpaymentconfigLanding: IpaymentconfigLanding = {
    payload: [],
    register:{isLoading:false},
    isLoading: false,
    filters: {
      sessions: { available: [], selected: '' },
      feeScopes: { available: ["Global","Session-based"], selected: 'Session-based' },
    },
  };