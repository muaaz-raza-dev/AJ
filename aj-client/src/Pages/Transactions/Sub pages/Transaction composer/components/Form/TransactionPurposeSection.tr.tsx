import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shdcn/components/ui/table";
import TransactionPurposeTableRow from "./TransactionPurposeTableRow.tr";
import { Button } from "@/shdcn/components/ui/button";
import RegLabelWrapper from "@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg";
import { Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedAddTransactionPurpose } from "@/app/Slices/TransactionComposeSlice";
import { Controller, useFormContext } from "react-hook-form";

function TransactionPurposeSectionFooter() {
  let dispatch = useAppDispatch();
  let { totalAmount ,discountedTotal} = useAppSelector((state) => state.trCompose);
  return (
    <div className="border-y py-6 items-center border-[#80808037] flex justify-between">
      <div className="flex items-end gap-x-2">
        <Button
          type="button"
          onClick={() => dispatch(RedAddTransactionPurpose())}
          className="border-[var(--dark)] border text-[var(--dark)] hover:bg-[var(-dark)] active:scale-95 transition-transform hover:text-[var(--dark)]"
        >
          Add purpose
        </Button>
      </div>
      <div className=" hFont ">
        <div className="flex font-medium tracking-tight justify-between gap-x-2 text-lg">
          {discountedTotal?
          <div className="hFont ">
            <div className="flex mx-4 justify-between text-sm  w-full"><h2>Total</h2> <p>{totalAmount}</p></div>
            <div className="flex mx-4 justify-between text-sm text-red-700 w-full"><h2>Discount</h2> <p>{totalAmount-discountedTotal}</p></div>
            <div className="flex mx-4 justify-between text-[1rem] gap-x-2 w-full"><h2>Grand Total</h2> <b className="text-green-700">{discountedTotal}.00 </b></div>
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
  let {totalAmount} = useAppSelector(state=>state.trCompose)
  return (
    <div className="flex flex-wrap gap-3">
      <RegLabelWrapper title="Amount Paid" className="w-[33%]">

      <Controller control={control} rules={{min:{value:totalAmount-1 ,message:"Can't be less than total Amount"}}} name='PaidAmount' render={({field,fieldState:{error}})=>
{return(<> <Input placeholder="4000" {...field} type="number" />
 {error && <p className="text-red-500 text-xs">{error.message}</p>}</>) }}/>
      </RegLabelWrapper>
      <Controller control={control}   name='Note' render={({field,fieldState:{error}})=>{
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
  let { Transactions } = useAppSelector((state) => state.trCompose);
  return (
    <div className=" py-2 flex flex-col gap-y-3">
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="text-[var(--dark)] hFont">Purpose</TableHead>
            <TableHead className="text-[var(--dark)] hFont">
              Payment Month-Year
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
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(Transactions).map((elm, index) => (
            <TransactionPurposeTableRow ObjectKey={elm} i={index} key={elm} />
          ))}
        </TableBody>
      </Table>
      <TransactionPurposeSectionFooter />
      <TransactionComposeAdditionalInputs></TransactionComposeAdditionalInputs>
    </div>
  );
};

export default TransactionPurposeSection;
