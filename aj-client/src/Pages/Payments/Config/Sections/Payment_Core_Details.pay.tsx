import LabelWrapper from "@/Pages/Classes/Registeration/Teacher/Helpers/LabelWrapper.dash";
import Select_Payment_Comp from "./components/Select_Payment_Comp.pay";
import CustomInputs_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomInputs_Reg.dash";
import { useFormContext } from "react-hook-form";
import { FC, useEffect } from "react";
import PaymentConfigFormSubmit from "./PaymentCOnfigFormSubmit.pay";

const Payment_Core_Details:FC<{loading:boolean,edit?:boolean}> = ({loading,edit}) => {
  let form = useFormContext();
  let feeFrequecy = form.watch("payload.feeFrequency");
  return (
    <div className={`${feeFrequecy!="One Time"?"w-[40%] flex-col":"w-full "} transition-all flex flex-col gap-4 rounded-lg  `}>
      <div className="w-full rounded-lg bg-[var(--box)] px-4 py-3 flex flex-col gap-3">
        <div className=" py-2 font-bold text-xl text-black hFont  ">
          Payment title & description
        </div>
        <CustomInputs_Reg
          field_name="payload.feeTitle"
          required 
          autoFocus
          placeholder="Fee Title"
          formContext={form}
        />
        <CustomInputs_Reg
          field_name="payload.feeDescription"
          placeholder="Fee description"
          formContext={form}
        />
      </div>
      <div className="w-full flex flex-col gap-2 rounded-lg bg-[var(--box)] px-4 py-2 ">
        <div className=" py-3 font-bold text-xl text-black hFont border-b ">
          Payment Core details
        </div>
        <FeeFrequency />   {/*Monthly  */}
        <FeeStatus />  {/* SessionBased */}
        <SessionSelection/>
        <FeeAmount />
    <PaymentConfigFormSubmit loading={loading} edit ={edit}/>
      </div>
    </div>
  );
};


const FeeAmount = ()=>{
  let form = useFormContext()
  let selectedType = form.watch("payload.feeStatus")
  let feeFrequency = form.watch("payload.feeFrequency")
  if(selectedType =="Same amount for every Class" ){
    let classes  =form.watch("payload.classes")
    let handleAllAmounts = (val:string)=>{
      if(feeFrequency=="One Time") {
        form.setValue("payload.feeAmount",+val)
      }
    form.setValue("payload.classes",classes.map((e:any)=>({...e,amount:+val})))
     }
  return <LabelWrapper
  className="w-full"
  labelClassName="text-base font-semibold "
  label="Fee Amount"
>
<input
    type='number'
    required
    placeholder='Write amount to apply to all classes then modify them.'
    onChange={({target:{value}})=>handleAllAmounts(value)}
    className=" border rounded-md  min-w-[40%] p-2 bg-transparent  border-[#8080806b]  focus:border-dark  transition-all outline-none "
    />
  </LabelWrapper>
  }
}

const SessionSelection = ()=>{
  let form = useFormContext();
  let values  = form.watch("filters.sessions.available") 
  let feeFrequecy = form.watch("payload.feeFrequency")
  let handleSessionSelection=(val:string)=>{
    if((!form.watch("payload.classes")||form.watch("payload.classes")?.length==0 )&& form.watch("payload.session") ) {
      form.setValue("payload.classes",form.watch("filters.sessions.Classes")[val])
      form.setValue("payload.paymentMonths",form.watch("filters.paymentMonths")[val])
    }
  }
  useEffect(() => {
  if(feeFrequecy=="One Time"){
    form.setValue("payload.session",null)
    form.setValue("payload.classes",[])
    form.setValue("payload.paymentMonths",[])
  }
  }, [feeFrequecy])
  if(feeFrequecy!="One Time") {
    return <LabelWrapper
    className="w-full"
    labelClassName="text-base font-semibold "
    label="Select Yearly Session"
    >
      <Select_Payment_Comp
      onChange = {handleSessionSelection}
      options={values||[]}
      fieldName="payload.session"
      placeholder="i.e 2024-2025"
      />
    </LabelWrapper>
}
}




const FeeFrequency = () => {
  let form = useFormContext()
  let value = form.watch("filters.feeTypes");
    return (
      <LabelWrapper
      className="w-full"
      labelClassName="text-base font-semibold "
      label="Fee Frequency"
      >
      <Select_Payment_Comp
        options={value?.map((e: string) => ({ value: e, label: e }))}
        fieldName="payload.feeFrequency"
        placeholder="i.e Monthly"
        />
    </LabelWrapper>
  ); 
};

const FeeStatus = () => {
  let form =useFormContext()
  let value = useFormContext().watch("filters.feeStatuses");
  let feeFrequecy = form.watch("payload.feeFrequency")
  if(feeFrequecy!="One Time") {
  return (
    <LabelWrapper
      className="w-full"
      labelClassName="text-base font-semibold "
      label="Fee Status"
    >
      <Select_Payment_Comp
        options={value?.map((e: string) => ({ value: e, label: e }))}
        fieldName="payload.feeStatus"
        placeholder="i.e Same for every class"
      />
    </LabelWrapper>
  );}
};

export default Payment_Core_Details;
