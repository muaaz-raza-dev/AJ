import { Input, Tooltip } from "antd";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import { useDebouncedCallback } from "use-debounce";
import { FaBan } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FC, useEffect, useState } from "react";
import useSearchStudentswithGRNO from "@/Hooks/Transactions/useSearchStudentswithGRNO";
import RegLabelWrapper from "@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg";
import { useAppSelector } from "@/app/ReduxHooks";

const TransactionSearchStudentsField: FC<{ transaction?: boolean }> = () => {
  let {
    mutate: Search,
    isError,
    isSuccess,
    data,
  } = useSearchStudentswithGRNO();
  let GRNO = useAppSelector((state) => state.trCompose)?.student?.GRNO;
  const [Inputed, setInputed] = useState(GRNO || "");
  useEffect(() => setInputed(GRNO || ""), [GRNO]);
  let Error =
    useAppSelector((state) => state.trCompose)?.Errors && Inputed == "";
  const debounced = useDebouncedCallback((value) => {
    Search(value);
  }, 1500);
  function GRSuffix() {
    return (
      <div className=" flex justify-end">
        {!isSuccess && !isError ? (
          <RequestLoading size="20" stroke="2" dark />
        ) : isError ? (
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
      <div className="flex  justify-between items-center">
        <Input
          value={Inputed}
          defaultValue={GRNO || ""}
          onChange={(e) => {
            debounced(e.target.value);
            setInputed(e.target.value);
          }}
          placeholder="Input GRno here"
          className="active:border-[var(--dark)] w-[95%]"
        />
        <GRSuffix />
      </div>
      {Error && <p className="text-red-500 text-xs">GR no. is required</p>}
    </RegLabelWrapper>
  );
};

export default TransactionSearchStudentsField;
