import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedInsertFeeExclusive } from "@/app/Slices/StdExclusiveSlice";
import useFetchStudetFeeExclusive from "@/Hooks/Read Student Exclusive/useFetchStudetFeeExclusive";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shdcn/components/ui/select";
import { useEffect } from "react";
const FeeHeader = () => {
  return (
    <main className="w-full flex gap-x-4 p-4">
      <FeeHeaderDateSelect />
      <FeeHeaderTypeSelect />
    </main>
  );
};

const FeeHeaderDateSelect = () => {
  const dispatch = useAppDispatch();
  let {Filters: {Filters: { Years },AppliedFilters: { Year,FeeType }}} = useAppSelector((s) => s.stdExclusive.Fees);
  let {refetch} = useFetchStudetFeeExclusive()
  useEffect(() => {
  refetch()
  }, [Year,FeeType])
  return (
    <div className="flex flex-col">
      <b className="text-xs text-[var(--dark)] py-0.5">Date</b>
      <div className="flex rounded-xl  gap-x-1 ">
        <Select
          onValueChange={(e) =>
            dispatch(RedInsertFeeExclusive({ AppliedFilters: { Year: e } }))
          }
        >
          <SelectTrigger className="w-[80px] !rounded-lg border border-[var(--dark)] rounded-r-none bg-[var(--bg)] !focus-visible:ring-offset-transparent  !focus-visible:ring-0 relative">
            <SelectValue placeholder={Year} defaultValue={Year} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Years.map((type) => (
                <SelectItem key={`Fee Years ${type}`} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const FeeHeaderTypeSelect = () => {
  const dispatch = useAppDispatch();
  let {
    Filters: {
      Filters: { FeeTypes },
      AppliedFilters: { FeeType }
    },
  } = useAppSelector((s) => s.stdExclusive.Fees);
  return (
    <div className="flex flex-col">
      <b className="text-xs text-[var(--dark)] py-0.5">Type</b>
      <Select
        onValueChange={(e) =>
          dispatch(RedInsertFeeExclusive({ AppliedFilters: { FeeType: e } }))
        }
      >
        <SelectTrigger className="w-[120px] rounded-lg bg-[var(--bg)] border border-[var(--dark)] !focus-visible:ring-offset-transparent !focus-visible:ring-0 relative">
          <SelectValue placeholder={FeeType} defaultValue={FeeType} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {FeeTypes.map((type) => (
              <SelectItem key={`Fee Type ${type}`} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default FeeHeader;
