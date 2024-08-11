import { Table, TableBody, TableHead,TableHeader,TableRow,} from "@/shdcn/components/ui/table";
import TransactionPurposeTableRow from "./TransactionPurposeTableRow.tr";
import { Button } from "@/shdcn/components/ui/button";
import RegLabelWrapper from "@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg";
import { Input, Tooltip } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { ItransactionField } from "@/app/Types/ItransactionForm";
import { Info } from "lucide-react";


let defaultTransactionBlock = {paymentType: "Registered", paymentConfigId : "", month : "",year:"",
  amount:  {
    discount : 0 ,  //Just in numbers
    realAmount :0 , //without discount 
    totalAmount:0  //After minusing the discount from real amount            
  
} }
function TransactionPurposeSectionFooter() {
  let {watch , setValue}  =useFormContext()
  let {totalAmount,discount,realAmount} = watch("amount")
  let Transactions = watch("Transactions")
  
  let handlePuropseAddition = ()=> {
    let totalPurposes = Transactions.length
  
    if(Transactions[totalPurposes-1]?.amount?.realAmount!=0 || Transactions.length==0) {
      setValue("Transactions",[...Transactions,defaultTransactionBlock])
    }
  }
  return (
    <div className="border-y py-6 sm:items-center border-[#80808037] flex justify-between max-sm:flex-col gap-1">
      <div className="flex items gap-x-2 w-1/2">
        <Button
          type="button"
          onClick={handlePuropseAddition}
          className="border-[var(--dark)] border text-[var(--dark)] dark:text-white hover:bg-[var(-dark)] active:scale-95 transition-transform hover:text-[var(--dark)] dark:bg-dark"
        >
          Add purpose
        </Button>
      </div>
      <div className=" hFont whitespace-nowrap w-1/2 justify-end  flex self-end px-4">
        <div className="flex font-medium max-sm:full gap-x-2 text-lg  ">
          { realAmount?
          <div className="hFont whitespace-nowrap ">
            <div className="flex mx-4 justify-between text-sm  w-full"><h2>Total</h2> <p>{realAmount}</p></div>
            <div className="flex mx-4 justify-between text-sm text-red-700 w-full"><h2>Discount</h2> <p>{discount}</p></div>
            <div className="flex mx-4 justify-between text-[1rem] gap-x-2 w-full"><h2>Grand Total</h2> <b className="text-green-700">
              {totalAmount}.00 </b></div>
            </div>
          :
          <><h2 className="">Total :</h2> <p> {totalAmount}.00 Pkr</p></>
          }
        </div>
      </div>
    </div>
  );
}

function TransactionComposeAdditionalInputs() {
  let {control} = useFormContext()
  return (
    <div className="flex flex-wrap gap-3">
      <RegLabelWrapper title="Amount Paid" className="w-[33%] max-sm:w-full max-lg:w-[48%]">
      <Controller control={control} name='PaidAmount'
     render={({field,fieldState:{error}})=>
{return(<> <Input placeholder="4000" {...field} className="dark:bg-darker max-sm:w-full dark:text-white dark:placeholder:text-gray-500 dark:border-dark" type="number" />
 {error && <p className="text-red-500 text-xs">{error.message}</p>}</>)
 }}/>
      </RegLabelWrapper>
      <Controller control={control}  name='Note' render={({field,fieldState:{error}})=>{
return (
  <>
  <RegLabelWrapper title="Note (not required)" className="w-[65%]  max-lg:w-[48%] max-sm:w-full">
        <Input placeholder="All dues are clear now! " {...field} className="dark:bg-darker dark:text-white dark:placeholder:text-gray-500 dark:border-dark"/>
      </RegLabelWrapper>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
      </>
          )
      } }/>
<Controller control={control}  name='Time' render={({field})=>{
return (
  <>
  <RegLabelWrapper title="Date (not required)" className="w-[30%] max-lg:w-[48%] gap-2 max-sm:w-full">
    <div className="flex w-full gap-2 items-center">
        <Input placeholder="" type="Date" {...field} className="dark:bg-darker dark:text-white dark:placeholder:text-gray-500 dark:border-dark"/>
        <Tooltip title={"In case of delayed registeration. Insert the transaction date. Otherewise, keep this field remain empty"}>
        <Info size={16} className="text-gray-600"/>
        </Tooltip>
    </div>
      </RegLabelWrapper>
      </>
          )
      } }/>
    </div>
  );
}

const TransactionPurposeSection = () => {
  let Transactions  =useFormContext().watch("Transactions")
  
  return (
    <div className=" py-2 flex flex-col gap-y-3">
      <Table className="dark:text-white">
        <TableHeader>
          <TableRow className="dark:hover:bg-transparent dark:border-dark ">
            <TableHead className="text-[var(--dark)] dark:text-white hFont whitespace-nowrap">Custom </TableHead>
            <TableHead className="text-[var(--dark)] dark:text-white hFont whitespace-nowrap">Purpose</TableHead>
            <TableHead className="text-[var(--dark)] dark:text-white hFont whitespace-nowrap">
              Fee period / Session
            </TableHead>
            <TableHead className="text-[var(--dark)] dark:text-white hFont whitespace-nowrap ">
               Amount
            </TableHead>
            <TableHead
              className="text-[var(--dark)] dark:text-white hFont whitespace-nowrap 
            "
            >
              Discount
            </TableHead>
            <TableHead
              className="text-[var(--dark)] dark:text-white hFont whitespace-nowrap 
            "
            >
              Total Amount
            </TableHead>
            <TableHead
              className="text-[var(--dark)] dark:text-white hFont whitespace-nowrap w-[5%]
            "
            >
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Transactions.map((data:ItransactionField,index:number) => (
            <TransactionPurposeTableRow data={data} index={index}/>
          ))}
        </TableBody>
      </Table>
      <TransactionPurposeSectionFooter />
      <TransactionComposeAdditionalInputs></TransactionComposeAdditionalInputs>
    </div>
  );
};

export default TransactionPurposeSection;
