import useCancelTransaction from "@/Hooks/Transactions/useCancelTransaction"
import useFetchTransactionDetailed from "@/Hooks/Transactions/useFetchTransactionDetailed"
import { Button } from "@/shdcn/components/ui/button"
import { Popconfirm } from "antd"

const ActionBarTrDetails = () => {
  let {mutate,isLoading} =useCancelTransaction() //we will handle both restore and cancel in one hook
  let {data } = useFetchTransactionDetailed()
  let q = data?.payload
  let confirm = ()=>{
    mutate()
  }
  return (
    <div className="p-2  rounded-md flex gap-4 justify-end" >
      <Popconfirm
    title={` ${q?.isCancelled?"Restore":"Cancel"} the transaction"`}
    description={` Are you sure to ${q?.isCancelled?" restore":"cancel"} the transaction?`}
    onConfirm={confirm}
    placement="top"
    okText="Yes" 
    okButtonProps={{"className":"!bg-dark",'loading':isLoading}}
    cancelText="No"
  >
        <Button  className={`bg-[var(--box)] shadow ${q?.isCancelled?"bg-dark_dimmer hover:bg-dark_dimmer hover:text-black":
        "hover:bg-danger bg-danger text-white hover:text-white "}  font-bold `}>
{ q?.isCancelled?"Restore":"Cancel "} Transaction
        </Button>
  </Popconfirm>
           <Button className="bg-dark hover:bg-dark text-white shadow  font-bold " >
            Print Transaction
        </Button>
    </div>
  )
}

export default ActionBarTrDetails