import { IpurposeTransactionPdf } from "@/pdf/Types/IfilteredTransactions.pdf"

export function GetTransactionPurposes(tr:IpurposeTransactionPdf){
    if(tr.paymentType == "Custom") return `${ tr.paymentTitle} `
    else {
        if(tr.month){
            return ` ${tr.month} ${tr.year} ${tr.paymentTitle} ,`
        }
        else {
            return ` ${tr.session} ${tr.paymentTitle} ,`
        }
    } 
  }