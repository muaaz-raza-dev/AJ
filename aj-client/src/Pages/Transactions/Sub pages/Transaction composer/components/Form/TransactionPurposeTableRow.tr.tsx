import { TableCell, TableRow } from "@/shdcn/components/ui/table";
import { AutoComplete, Input,  Select } from "antd";
import TransactionMonthSelect, {
  TransactionYearSelect,
} from "./TransactionYearSelect.tr";
import { FaCheck, FaTrash } from "react-icons/fa";
import { ChangeEvent, Dispatch, FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import {
  RedDeleteTransactionPurpose,
  RedInsertTransactionPurpose,
} from "@/app/Slices/TransactionComposeSlice";
import Ld from "lodash";
import moment  from "moment";
import { GetPercentage } from "react-simpler";
interface IEachPaymentBlockType {
  amount: number;
  month?: string;
  year?: string;
  discount: { discountTypes: ["Percentage", "amount"];discountType:string; discountedAmount: number ,};
  purpose: string;
}
const TransactionPurposeTableRow: FC<{ i: number; ObjectKey: string }> = ({
  i,
  ObjectKey,
}) => {
  let Tr = useAppSelector((state) => state.trCompose.Transactions);
  let { Dates, Invoice } = useAppSelector((state) => state.trCompose);
  const [Inputs, setInputs] = useState<IEachPaymentBlockType>({
    amount: 0,
    month: "",
    year: "",
    purpose: "Monthly Fee",
    discount: { discountTypes: ["Percentage", "amount"], discountedAmount: 0,discountType:"Percentage" },
  });
  let dispatch = useAppDispatch();

  useEffect(() => {
    setInputs({
      discount:{...Inputs.discount,discountedAmount:Tr[i].discountedAmount??0}, //Temporary to get rid of error will change it don't worry
      amount: Tr[ObjectKey].amount,
      month: Tr[ObjectKey].month || moment().format("MMMM"),
      year: Tr[ObjectKey].year || moment().year().toString(),
      purpose: Tr[i].purpose,
    });
  }, [ObjectKey, Tr]);
  let ConfirmButtonValidation = () => {
    let Btn = (
      <button
        onClick={() =>
          dispatch(
            RedInsertTransactionPurpose({
              index: i.toString(),
              purpose: Inputs.purpose,
              amount: Inputs.amount ?? 0,
              month: Inputs.month,
              year: Inputs.year,
              discountedAmount:Inputs.discount.discountedAmount,
              Transactions: Tr,
            })
          )
        }
      >
        <FaCheck color="green" size={20} />
      </button>
    );
    if (!Tr[i].amount) {if (Inputs.purpose != "" && Inputs.amount != 0) {return Btn;}}
     else if (
      !Ld.isEqual(Tr[i], {amount:Inputs.amount,month:Inputs.month,year:Inputs.year,purpose:Inputs.purpose,discountedAmount:Inputs.discount.discountedAmount})) {
      return Btn;
    } else {
      return null;
    }
  }
  return (
    <TableRow>
      <TableCell>
        <AutoComplete
          className="w-full"
          disabled={Invoice == null}
          onChange={(e) => setInputs({ ...Inputs, purpose: e })}
          options={[
            { label: "Monthly Fee", value: "Monthly Fee" },
            { value: "Admission Fee", label: "Admission Fee" },
            { value: "Annual Fee", label: "Annual Fee" },
          ]}
          placeholder="Monthly Fee"
        />
      </TableCell>
      <TableCell className="flex gap-x-1 items-center">
        {Inputs.purpose.includes("Monthly") && (
          <TransactionMonthSelect
            months={Dates[Inputs.year || ""]}
            onValueChange={(e) => setInputs({ ...Inputs, month: e })}
          />
        )}

        <TransactionYearSelect
          years={Object.keys(Dates) || []}
          onValueChange={(e) => setInputs({ ...Inputs, year: e })}
        />
      </TableCell>
      <TableCell className="w-[15%] relative">
        {Inputs.discount.discountedAmount?<p className="text-green-600 text-[0.75rem] absolute top-0">{Inputs.amount}-{Inputs.discount.discountedAmount}={Inputs.amount-Inputs.discount.discountedAmount}</p>:null}
        <Input
          placeholder="5670"
          value={Inputs.amount}
          type="number"
          onChange={(e) => setInputs({ ...Inputs, amount: +e.target.value })}
          />
      </TableCell>
      <TransactionDiscountField values={{ Inputs, setInputs }} />
      <TableCell className="flex gap-x-5 center">
        <ConfirmButtonValidation />
        {Tr[i]?.amount ? (
          <button
            onClick={() =>
              dispatch(
                RedDeleteTransactionPurpose({
                  index: i.toString(),
                  Transactions: Tr,
                })
              )
            }
          >
            <FaTrash color="red" size={20} />
          </button>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

const TransactionDiscountField: FC<{
  values: {
    Inputs: IEachPaymentBlockType;
    setInputs: Dispatch<React.SetStateAction<IEachPaymentBlockType>>;
  };
}> = ({ values: { Inputs, setInputs } }) => {
  const [DiscountValue, setDiscountValue] = useState(0)
  const selectBefore = (
    <Select  value={Inputs.discount.discountType} onChange={(e)=>{setInputs(a=>({...a,discount:{...a.discount,discountType:e}}))
    HandleDiscountAmount({discountType:e})
    }}>
      <Select.Option value="amount">pkr</Select.Option>
      <Select.Option value="Percentage">%</Select.Option>
    </Select>
  );
  let HandleDiscountAmount  =({e,discountType}:{e?:ChangeEvent<HTMLInputElement>,discountType?:string})=>{
    let value = e?.target.value ??DiscountValue
    let Type = discountType?? Inputs.discount.discountType 
    console.log(value,Type);
    if(Type=="Percentage"&&+value<=100){
          setDiscountValue(+value)
          let Amount=Math.round(GetPercentage({mode:"amount",percent:+value,total:Inputs.amount})??0)
          
        if(Amount)setInputs(a=>({...a,discount:{...a.discount,discountedAmount:Amount}}))
        }
          else if(Type=="amount"&&+value<=Inputs.amount){
            setDiscountValue(+value)
            setInputs(a=>({...a,discount:{...a.discount,discountedAmount:+value}}))
          }
  }
  return (
    <TableCell>
      <Input
        placeholder={`Type the ${Inputs.discount.discountType} to deduct`}
        disabled={!Inputs.amount}
        value={DiscountValue}
        onChange={(e)=>HandleDiscountAmount({e})}
        type="number "
        className="w-full"
        maxLength={Inputs.discount.discountType=="%"?3:Inputs.amount.toString().length}
        addonAfter={selectBefore}
        />
    </TableCell>
  );
};
export default TransactionPurposeTableRow;
