import { useAppSelector } from "@/app/ReduxHooks"
import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash"
import { Input } from "antd"
import { FC } from "react"
import { useFormContext } from "react-hook-form"

const TransactionMonthSelect:FC<{fieldName:string}> = ({fieldName}) => {
    let {watch,setValue} = useFormContext()
    let paymentType = watch(`${fieldName}.paymentType`)
    let {Dates ,Purposes} =useAppSelector(s=>s.trComposeFilters.FeeInfo)
    let paymentConfigId = watch(`${fieldName}.paymentConfigId`) 
    let Sessions =useAppSelector(s=>s.global.Sessions)
    let month = watch(`${fieldName}.month`) ||""
    let year = watch(`${fieldName}.year`)||""
    if(paymentType != "Custom"&&paymentConfigId) {
        let feeFrequency =  Purposes.find(e=>e.value==paymentConfigId)?.feeFrequency
        const handleMonthSelection = (val:string)=>{
            setValue(`${fieldName}.month`,val)                       
        }
        const handleYearSelection = (val:string)=>{
            setValue(`${fieldName}.year`,val)                       
        }
        if(feeFrequency =="Monthly"||feeFrequency =="Custom" ){
            return (
                <>
            <CustomSelect_Reg className="antd-selectBarDark min-w-32" nosearch setState={handleYearSelection} state={year} data={Object.keys(Dates[paymentConfigId]||{})} />
            <CustomSelect_Reg className="antd-selectBarDark min-w-32" nosearch setState={handleMonthSelection} state={month} data={Dates[paymentConfigId][year]||[]} />
            </>
        )
    }
    else if(feeFrequency == "Yearly" ) {
        let sessionId = watch(`${fieldName}.sessionId`)
        let handleSessionIdSelection = (val:string) =>{
                setValue(`${fieldName}.sessionId`,val)
        }

        return (
            <CustomSelect_Reg nosearch className="antd-selectBarDark min-w-44"  setState={handleSessionIdSelection} state={sessionId||""}
             optimumData={Object.entries(Sessions).map(e=>({label:e[1],value:e[0]}))} />
        )
    }

    else if(feeFrequency=="One Time") {
        let sessionId = watch(`${fieldName}.sessionId`)
        return (
            <Input value={Sessions[sessionId]} disabled/>
        )
    }
    
    }
}

export default TransactionMonthSelect