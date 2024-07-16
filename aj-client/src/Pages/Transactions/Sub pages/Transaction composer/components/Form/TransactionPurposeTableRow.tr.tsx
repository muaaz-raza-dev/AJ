import { TableCell, TableRow } from "@/shdcn/components/ui/table";
import { FC } from "react";
import { ItransactionField } from "@/app/Types/ItransactionForm";
import TransactionTitleSelectionComp from "./TransactionTitleSelectionComp.tr";
import TransactionMonthSelect from "./TransactionMonthSelect.tr";
import CustomSwitch from "./Pupose table/CustomSwitch.tr";
import CustomAmountSelection, { TotalAmountSelection } from "./Pupose table/CustomAmountSelection.tr";
import CustomDiscountComp from "./Pupose table/CustomDiscountComp.tr";
import DeleteTransactionBlock from "./Pupose table/DeleteTransactionBlock.tr";


const TransactionPurposeTableRow: FC<{ index: number; data: ItransactionField }> = ({index
}) => {
  let Field_name = `Transactions[${index}]`
  return (
    <TableRow >
      <TableCell>
        <CustomSwitch fieldName={Field_name}/>
      </TableCell>
      <TableCell className="w-[15%]">
 <TransactionTitleSelectionComp fieldName={Field_name}/>      
      </TableCell>
      <TableCell className="flex gap-x-1 w-full items-center">
      <TransactionMonthSelect  fieldName={Field_name} />
      </TableCell>
      <TableCell className="w-[15%] relative ">
      <CustomAmountSelection fieldName={Field_name}/>
      </TableCell>
      <TableCell className="flex gap-x-1 center">
        <CustomDiscountComp fieldName={Field_name}/>
      </TableCell>
      <TableCell className="">
        <TotalAmountSelection fieldName={Field_name}/>
      </TableCell>
      <TableCell className="">
        <DeleteTransactionBlock index={index}/>
      </TableCell>
    </TableRow>
  );
};

export default TransactionPurposeTableRow;
