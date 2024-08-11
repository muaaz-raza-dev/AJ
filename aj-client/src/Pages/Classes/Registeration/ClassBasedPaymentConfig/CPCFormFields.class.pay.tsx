import  { FC } from 'react'
import CustomInputs_Reg from '../Teacher/Helpers/CustomInputs_Reg.dash';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IclassPaymentConfig } from '@/app/Types/IclassPaymentConfig';
import { ArrowUpRightSquare } from 'lucide-react';
import { Tooltip } from 'antd';

const CPCFormFields = () => {
    let {watch} =useFormContext<IclassPaymentConfig>()
    let ConfigDetails = watch("Configs")
  return (

      <div className="w-full p-4  bg-box dark:bg-dark dark:text-white rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-3xl font-bold  text-darker hFont dark:text-white">Payment Config Details</h2>
    
          <div className='flex flex-wrap gap-2 rounded-md'>
            
       {
           ConfigDetails?.map((e,i)=>(<EachCPCFormField disabled={e.Config.feeStatus.includes("Same")}
           tooltip={e.Config.feeStatus} fieldname={`Configs.[${i}].class.amount` } label={e.Config.feeTitle} link={`/payment-settings/${e.Config._id}`} key={e.Config._id} />))
    }
          </div>


          
        
      </div>
  );

  
}


const EachCPCFormField:FC<{fieldname:string;label:string;link:string;tooltip?:string;disabled?:boolean}> = ({fieldname,label,link,disabled,tooltip})=> {
let form =useFormContext()

return <div className={`flex w-[48%]   rounded-md  flex-col gap-1`}>
<div className="">
<Tooltip title={disabled?tooltip:""} className='w-max'>
<Link to={link} className="DarkText flex dark:text-white hFont text-lg underline w-full font-bold items-center gap-2">
<h1>
{label}
</h1>
<ArrowUpRightSquare size={18}/>
</Link>
</Tooltip>
</div>
<div className="w-[90%]">

<CustomInputs_Reg disabled={disabled} type='number' formContext={form} field_name={fieldname}  />
</div>

</div>
}
export default CPCFormFields