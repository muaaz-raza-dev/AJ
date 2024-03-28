import { useAppSelector } from "@/app/ReduxHooks"
import moment from "moment"

const TransactionCreateHeader = () => {
  let {Invoice} = useAppSelector(state=>state.trCompose)
  return (
    <div className="flex w-full border-b border-[var(--bg)] pb-4">
        <div className="flex w-[45%] font-bold text-sm items-center gap-x-1">
            Date: <p className="text-[#444343] ">
                {moment().format('YYYY-MM-DD')}
                </p> 
        </div>
        <div className="flex text-xl font-bold gap-x-1 hFont w-[50%]">
            <h1>Invoice </h1>
            <span className="flex"># <p className="text-[var(--dark)]">{ `00${Invoice}`|| "XXXX"}</p> </span>
        </div>
    </div>
  )
}

export default TransactionCreateHeader
