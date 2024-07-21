import { Table, TableBody, TableHead,TableHeader,TableRow,} from "@/shdcn/components/ui/table";
import TransactionPurposeTableRow from "./TransactionPurposeTableRow.tr";
import { Button } from "@/shdcn/components/ui/button";
import RegLabelWrapper from "@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { ItransactionField } from "@/app/Types/ItransactionForm";


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
    <div className="border-y py-6 items-center border-[#80808037] flex justify-between">
      <div className="flex items-end gap-x-2">
        <Button
          type="button"
          onClick={handlePuropseAddition}
          className="border-[var(--dark)] border text-[var(--dark)] hover:bg-[var(-dark)] active:scale-95 transition-transform hover:text-[var(--dark)]"
        >
          Add purpose
        </Button>
      </div>
      <div className=" hFont ">
        <div className="flex font-medium tracking-tight justify-between gap-x-2 text-lg">
          { realAmount?
          <div className="hFont ">
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
  let {control,watch} = useFormContext()
  let totalAmount = watch("totalAmount")
  return (
    <div className="flex flex-wrap gap-3">
      <RegLabelWrapper title="Amount Paid" className="w-[33%]">
      <Controller control={control} rules={{ required:"The payment amount is required",min:{value:totalAmount-1 ,message:"Can't be less than total Amount"}}} name='PaidAmount'
     render={({field,fieldState:{error}})=>
{return(<> <Input placeholder="4000" {...field} type="number" />
 {error && <p className="text-red-500 text-xs">{error.message}</p>}</>)
 }}/>
      </RegLabelWrapper>
      <Controller control={control}  name='Note' render={({field,fieldState:{error}})=>{
return (
  <>
  <RegLabelWrapper title="Note (not required)" className="w-[65%]">
        <Input placeholder="All dues are clear now! " {...field}/>
      </RegLabelWrapper>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
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
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="text-[var(--dark)] hFont">Custom </TableHead>
            <TableHead className="text-[var(--dark)] hFont">Purpose</TableHead>
            <TableHead className="text-[var(--dark)] hFont">
              Fee period / Session
            </TableHead>
            <TableHead className="text-[var(--dark)] hFont w-[10%]">
               Amount
            </TableHead>
            <TableHead
              className="text-[var(--dark)] hFont w-[20%]
            "
            >
              Discount
            </TableHead>
            <TableHead
              className="text-[var(--dark)] hFont w-[15%]
            "
            >
              Total Amount
            </TableHead>
            <TableHead
              className="text-[var(--dark)] hFont w-[5%]
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
