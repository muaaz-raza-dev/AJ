import { Popconfirm } from "antd"
import useCancelTransaction from '@/Hooks/Transactions/useCancelTransaction'
import { Button } from '@/shdcn/components/ui/button'
import useFetchTransactionDetailed from '@/Hooks/Transactions/useFetchTransactionDetailed'

const ToggleTransactionStatus = () => {
    let {data } = useFetchTransactionDetailed()
  let {mutate,isLoading} =useCancelTransaction() //we will handle both restore and cancel in one hook
  let q = data?.payload
    let confirm = ()=>{

        mutate()
      }
  return (
        <Popconfirm
    title={` ${q?.isCancelled?"Restore":"Cancel"} the transaction"`}
    description={` Are you sure to ${q?.isCancelled?" restore":"cancel"} the transaction?`}
    onConfirm={confirm}
    placement="top"
    okText="Yes" 
    okButtonProps={{"className":"!bg-dark",'loading':isLoading}}
    cancelText="No"
  >
        <Button  className={`bg-[var(--box)] max-md:w-full md:w-72 shadow ${q?.isCancelled?"bg-dark_dimmer hover:bg-dark_dimmer hover:text-black":
        "hover:bg-danger bg-danger text-white hover:text-white "}  font-bold `}>
{ q?.isCancelled?"Restore":"Cancel "} Transaction
        </Button>
  </Popconfirm> 
  )
}

export default ToggleTransactionStatus