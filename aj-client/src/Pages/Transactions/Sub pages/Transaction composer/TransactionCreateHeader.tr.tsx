import { ItransactionForm } from "@/app/Types/ItransactionForm"
import moment from "moment"
import { useFormContext } from "react-hook-form"

const TransactionCreateHeader = () => {
  const Invoice = useFormContext<ItransactionForm>().watch("Invoice")
  return (
    <div className="flex w-full border-b border-light dark:border-dark pb-4 ">
        <div className="flex min-w-[40%] whitespace-nowrap font-bold text-sm items-center gap-x-1 ">
            Date: <p className="text-[#444343] dark:text-white ">
                {moment().format('YYYY-MM-DD')}
                </p> 
        </div>
        <div className="flex text-xl font-bold gap-x-2 hFont w-[50%] ">
            <h1>Invoice : </h1>
            <span className="flex"> <p className="text-[var(--dark)] dark:text-white">{ Invoice ? ` 00${Invoice}`: " XXXX"}</p> </span>
        </div>
    </div>
  )
}

export default TransactionCreateHeader
