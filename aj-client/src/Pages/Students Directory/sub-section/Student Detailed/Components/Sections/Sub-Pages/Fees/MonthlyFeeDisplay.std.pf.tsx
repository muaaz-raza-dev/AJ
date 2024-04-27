import { useAppSelector } from "@/app/ReduxHooks"
import EachPaymentBlock from "./EachPaymentBlock.std.pf"

const MonthlyFeeDisplay = () => {
  let FeeBoxes=useAppSelector(s=>s.stdExclusive.Fees.FeeCollection)
  return (
    <div className="px-4 flex flex-col gap-y-1">
        {/* <header className="bg-[var(--box)]  border-2 border-[var(--primary)] center p-1 font-black hFont text-lg">
            {Year}
        </header> */}
        <main className="flex flex-wrap gap-2">
          {
            FeeBoxes.map((data,i)=><EachPaymentBlock key={`Payment BLock ${i}`} data={data}/>)
          }
        </main>
    </div>
  )
}

export default MonthlyFeeDisplay