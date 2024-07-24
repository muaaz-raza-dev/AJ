import { useAppSelector } from "@/app/ReduxHooks";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import { useTrackChanges } from "@/Hooks/Common/useTrackChanges";
import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash"


const RegisterationFormSumbit:FC<{isLoading:boolean,edit?:boolean}> = ({isLoading,edit}) => {
const {watch,} = useFormContext()
let values =watch()
let {changes,UpdateState} = useTrackChanges(values)
let  Init = useAppSelector(s=>s.stdExclusive.Information)
useEffect(() => {
UpdateState(Init.Details)
}, [Init])
  return (
    <div className="w-full items-center justify-end gap-x-2 flex">
      <button type="submit" className={`rounded-xl transition-colors duration-150 w-28 py-1.5 bg-[var(--dark)] border-[var(--dark)] border text-white hFont hover:text-[var(--dark)] hover:bg-[var(--box)] ${edit&&!changes&&"grayscale"} `} disabled={edit&&!changes}>
        {isLoading? <RequestLoading size="22" stroke="2"/>:edit?" Update ":"Register"}
      </button>
    </div>
  );
};

export default RegisterationFormSumbit;
