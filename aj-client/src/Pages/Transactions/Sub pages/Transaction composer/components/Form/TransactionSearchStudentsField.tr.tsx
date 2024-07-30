import { Input, Tooltip } from "antd";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import { useDebouncedCallback } from "use-debounce";
import { FaBan } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FC, useState } from "react";
import useSearchStudentswithGRNO from "@/Hooks/Transactions/useSearchStudentswithGRNO";
import RegLabelWrapper from "@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg";

const TransactionSearchStudentsField: FC<{ transaction?: boolean }> = () => {
  let {
    mutate: Search,
    isSuccess,
    data,
    isLoading
  } = useSearchStudentswithGRNO();
  const [Inputed,setInputed]=useState("")
  const debounced = useDebouncedCallback((value) => {
    Search(value);
  }, 1500);
  
  function GRSuffix() {
    return (
      <div className=" flex justify-end">
        {isLoading  ? (
          <RequestLoading size="20" stroke="2" dark />
        ) : !isSuccess ? (
          <Tooltip title={"Not exists"}>
            <FaBan />
          </Tooltip>
        ) : (
          <Tooltip title={data.message}>
            <MdVerified />
          </Tooltip>
        )}
      </div>
    );
  }

  return (
    <RegLabelWrapper title="Student" className="w-[100%] flex gap-x-2">
      <div className="flex  gap-4 items-center">
        <Input
          value={Inputed}
          defaultValue={""}
          onChange={(e) => {
            debounced(e.target.value);
            setInputed(e.target.value);
          }}
          placeholder="Input GRno here"
          className="active:border-[var(--dark)] w-[95%] dark:bg-darker dark:border-dark dark:text-white dark:placeholder:text-gray-500"
        />
        <GRSuffix />
      </div>
      {!Inputed && isSuccess && <p className="text-red-500 text-xs">GR no. is required</p>}
    </RegLabelWrapper>
  );
};

export default TransactionSearchStudentsField;
