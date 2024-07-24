import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { FaRegTrashCan } from "react-icons/fa6"

const DeleteTransactionBlock:FC<{index:number}> = ({index}) => {
let {watch,setValue} =useFormContext()
let transactions = watch("Transactions")
    let handleDelete =  ()=>{
      setValue(`Transactions`,transactions.filter((_:any,i:number)=>i!=index))
    }
  return (
    <button onClick={handleDelete}> 
      <FaRegTrashCan size={22} className="hover:text-red-500 transition-colors"/>
    </button>
  )
}

export default DeleteTransactionBlock