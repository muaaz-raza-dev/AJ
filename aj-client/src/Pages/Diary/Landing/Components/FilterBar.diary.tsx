import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ReddlInsertFilters } from "@/app/Slices/DiarySlice";
import useGetDiaries from "@/Hooks/Diary/useFetchDiary";
import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash";
import { Label } from "@/shdcn/components/ui/label";
import { Input } from "antd";
import { useEffect } from "react";
export default function FilterBar() {
  const dispatch = useAppDispatch();
  const {mutate}= useGetDiaries();
  const { Class, date, section, session } = useAppSelector(
    (s) => s.diarySlice.filters.selected
  );
  const { classes, sections, sessions } = useAppSelector(
    (s) => s.diarySlice.filters.available
  );

  useEffect(() => {
   if(date&&section) mutate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date,section])

  const handleSessionChange = (session: string) => {
    const Class = Object.keys(classes[session] ?? {})[0];
    dispatch(
      ReddlInsertFilters({
        type: "selected",
        session,
        Class,
        section: Object.keys(sections[Class] ?? {})[0],
      })
    );
  };

  const handleClassChange = (Class: string) => {
    dispatch(
      ReddlInsertFilters({
        type: "selected",
        Class,
        section: Object.keys(sections[Class] ?? {})[0],
      })
    );
  };

  const handleSectionChange = (section: string) => {
    dispatch(ReddlInsertFilters({ type: "selected", section }));
  };
  return (
    <header className="flex gap-3 ">
      <div className="flex flex-col gap-2">
        <Label className="hFont">Select Yearly Session</Label>
        <CustomSelect_Reg
          state={session}
          className="!min-w-[180px]"
          setState={handleSessionChange}
          optimumData={Object.entries(sessions ?? {}).map((ses) => ({
            label: ses[1],
            value: ses[0],
          }))}
          placeholder="Select Class"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="hFont">Select Class</Label>
        <CustomSelect_Reg
          state={Class}
          className="!min-w-[180px]"
          setState={handleClassChange}
          optimumData={Object.entries(classes[session] ?? {}).map((ses) => ({
            label: ses[1],
            value: ses[0],
          }))}
          placeholder="Select Class"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="hFont">Select Section</Label>
        <CustomSelect_Reg
          state={section}
          className="!min-w-[180px]"
          setState={handleSectionChange}
          optimumData={Object.entries(sections[Class] ?? {}).map((ses) => ({
            label: ses[1],
            value: ses[0],
          }))}
          placeholder="Select Class"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="hFont">Pick Date </Label>
        <Input
          className="min-w-[180px]"
          type="date"
          value={date}
          onChange={({ target: { value } }) => {
            dispatch(ReddlInsertFilters({ type: "selected", date: value }))
          }
          }
        />
      </div>
    </header>
  );
}
