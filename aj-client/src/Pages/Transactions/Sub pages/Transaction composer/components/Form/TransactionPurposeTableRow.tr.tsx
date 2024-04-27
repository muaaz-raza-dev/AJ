import { TableCell, TableRow } from "@/shdcn/components/ui/table";
import { AutoComplete, Input } from "antd";
import TransactionMonthSelect, {
  TransactionYearSelect,
} from "./TransactionYearSelect.tr";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import {
  RedDeleteTransactionPurpose,
  RedInsertTransactionPurpose,
} from "@/app/Slices/TransactionComposeSlice";
import Ld from "lodash";
import moment from "moment";
const TransactionPurposeTableRow: FC<{ i: number; ObjectKey: string }> = ({
  i,
  ObjectKey,
}) => {
  let Tr = useAppSelector((state) => state.trCompose.Transactions);
  let {Dates,Invoice} = useAppSelector(state=>state.trCompose)
  const [Inputs, setInputs] = useState<{
    amount: number;
    month?: string;
    year?: string;
    purpose: string;
  }>({ amount: 0, month: "", year: "", purpose: "Monthly Fee" });
  let dispatch = useAppDispatch();

  useEffect(() => {
    setInputs({
      amount: Tr[ObjectKey].amount,
      month: Tr[ObjectKey].month || moment().format("MMMM"),
      year: Tr[ObjectKey].year || moment().year().toString(),
      purpose: Tr[i].purpose,
    });
  }, [ObjectKey, Tr]);
  function ConfirmButtonValidation() {
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
              Transactions: Tr,
            })
          )
        }
      >
        <FaCheck color="green" size={20} />
      </button>
    );
    if (!Tr[i]?.amount) {
      if (Inputs?.purpose != "" && Inputs?.amount != 0) {
        return Btn;
      } else {
        return "";
      }
    } else if (!Ld.isEqual(Tr[i], Inputs)) {
      return Btn;
    } else {
      return "";
    }
  }
  return (
    <TableRow>
      <TableCell>
        <AutoComplete
          className="w-full"
          disabled={Invoice==null}
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
        {
          Inputs.purpose.includes("Monthly")&&
          <TransactionMonthSelect months={Dates[Inputs.year||""]}
        onValueChange={(e) => setInputs({ ...Inputs, month: e })}
        />
      }

        <TransactionYearSelect years={Object.keys(Dates)||[]}
          onValueChange={(e) => setInputs({ ...Inputs, year: e })}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="5670"
          value={Inputs.amount}
          type="number"
          onChange={(e) => setInputs({ ...Inputs, amount: +e.target.value })}
        />
      </TableCell>
      <TableCell className="flex gap-x-5 center">
        <ConfirmButtonValidation />
        { Tr[i]?.amount ? (
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
        ):null}
      </TableCell>
    </TableRow>
  );
};

export default TransactionPurposeTableRow;
