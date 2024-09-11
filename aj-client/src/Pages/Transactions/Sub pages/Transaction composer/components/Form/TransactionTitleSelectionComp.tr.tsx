import { useAppSelector } from "@/app/ReduxHooks";
import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const TransactionTitleSelectionComp: FC<{ fieldName: string }> = ({
  fieldName,
}) => {
  const { Purposes, Amounts } = useAppSelector((s) => s.trComposeFilters.FeeInfo);
  const { watch, setValue } = useFormContext();
  const paymentType = watch(`${fieldName}.paymentType`);
  const paymentConfigId = watch(`${fieldName}.paymentConfigId`);
  const paymentTitle = watch(`${fieldName}.paymentTitle`);
  const handlePurposeSelection = (val: string) => {
    const isRegistered = Purposes.some(({ value }) => value == val);
    let paymentType = "Registered";
    if (!isRegistered) {
      paymentType = "Custom";
      setValue(`${fieldName}.paymentTitle`, val);
    } else {
      const purpose = Purposes.find((e) => e.value == val);
      if (purpose?.feeFrequency == "One Time")
        setValue(`${fieldName}.sessionId`, purpose.sessionId);
      setValue(`${fieldName}.amount.realAmount`, Amounts[val]);
      setValue(`${fieldName}.amount.totalAmount`, Amounts[val]);
      setValue(`${fieldName}.paymentConfigId`, val);
      setValue(`${fieldName}.paymentTitle`, purpose?.feeTitle);
    }
    setValue(`${fieldName}.paymentType`, paymentType);
  };

  if (paymentType == "Custom") {
    return (
      <input
        type="text"
        placeholder="Enter custom payment title"
        className="
         border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark dark:bg-dark dark:text-white dark:placeholder:text-gray-500  transition-all outline-none 
         "
        value={paymentTitle}
        onChange={(e) => {
          setValue(`${fieldName}.paymentTitle`, e.target.value);
          setValue(`${fieldName}.paymentConfigId`, "");
        }}
      />
    );
  } else {
    return (
      <CustomSelect_Reg
        className="antd-selectBarDark min-w-36"
        setState={handlePurposeSelection}
        state={paymentConfigId}
        optimumData={Purposes}
      />
    );
  }
};

export default TransactionTitleSelectionComp;
