import TransactionComposeForm from "./Form/TransactionComposeForm.tr"


const TransactionComposePage = ({edit=false}:{edit?:boolean}) => {
  return (
    <div className=" center ">
<div className="w-full p-8 max-md:p-4 aspect rounded-lg bg-[var(--box)] dark:bg-darker dark:text-white shadow flex">
<TransactionComposeForm edit={edit} />
</div>
    </div>
  )
}

export default TransactionComposePage
