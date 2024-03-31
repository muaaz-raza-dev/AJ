import { MdAutoGraph } from "react-icons/md"

const StdProfileTransactions = () => {
  return (
    <div className="bg-[var(--box)] rounded-lg py-4 flex flex-col gap-y-3">
    <h1 className="text-xl text-[var(--darker)] font-bold hFont px-4">Payment History</h1>
        <div className="flex flex-col px-4">
        <div className="py-2 flex gap-x-4 bg-[var(--bg)] items-center  text-sm pr-4">
            <div className="bg-[var(--dark)] w-5 h-full">f</div>
            <div className="rounded-full center w-8 text-white items-center aspect-square bg-[var(--darker)]">
            <MdAutoGraph size={20}/>
            </div>
            <span># <b className="text-[var(--dark)]">4344</b></span>
            <b>4500 pkr</b>
        </div>

        </div>
    </div>
  )
}

export default StdProfileTransactions
