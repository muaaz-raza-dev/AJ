import { FC } from "react"
import PaymentConfigForm from "./PaymentConfigForm.pay"

const ConfigPage:FC<{edit?:boolean}> = ({edit}) => {
  return (
   <PaymentConfigForm edit={edit}/>
  )
}

export default ConfigPage