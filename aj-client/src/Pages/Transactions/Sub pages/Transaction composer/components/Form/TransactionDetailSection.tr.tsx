import TransactionComposeForm from "./TransactionComposeForm.tr"

const TransactionDetailSection =({edit=false}:{edit?:boolean}) => {
  return (
      <TransactionComposeForm edit={edit} />
  )
}

export default TransactionDetailSection
