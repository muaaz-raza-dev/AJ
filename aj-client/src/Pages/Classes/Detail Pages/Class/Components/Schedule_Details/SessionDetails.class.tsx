import FilterBar from "./FilterBar.class"
import { Separator } from "@/shdcn/components/ui/separator";
import { useAppSelector } from "@/app/ReduxHooks";
import { Iteacher } from "@/app/Types/ITeacherRegisteration";
import SubjectTeacherDetails from "./SubjectTeacherDetails.class";
import { EachKVBlock } from "@/Pages/Students Directory/sub-section/Student Detailed/Components/Sections/Sub-Pages/StudentDetailsKeyValuePairs.std.pf";
const SessionDetails = () => {
  let {sections} =useAppSelector(s=>s.classDetailed.payload)
  let {selected_index:i} =useAppSelector(s=>s.classDetailed.Filters.Sections)
  let ClassTeacher =useAppSelector(s=>s.classDetailed.payload?.sections[i]?.ClassTeacher) as Iteacher
  return (
    <div className="flex flex-col w-full bg-[var(--box)] rounded-md p-6 gap-4">
          {/* Filter Bar */}
        <FilterBar/>
        <Separator  />
        <div className="flex flex-wrap gap-2">
        <EachKVBlock label="Session Name" value={sections[i].name}/>
        <EachKVBlock label="Class Teacher" value={ClassTeacher.firstName}/>
        <EachKVBlock label="Total Students" value={sections[i].Students.length}/>
        <EachKVBlock label="Start Date" value={sections[i].start_date}/>
        <EachKVBlock label="Capacity of Students" value={sections[i].capacity}/>
        </div>
        <div className="  w-[95%] flex justify-between">
        <div className="">

        <h1 className="hFont  font-semibold  text-gray-600 pb-2">Subjects</h1>
        <div className="flex gap-1.5 flex-wrap">
          {sections[i].subjects.map((e) => {
            return (
              <div className="w-max rounded-md cursor-default text-sm px-2 py-1 font-semibold border-2 hover:text-white hover:bg-dark_dimmer transition-colors border-[var(--dark)] text-darker">
                {e}
              </div>
            );
          })}
          </div>
        </div>
      </div>

        <div className="">
    <h2 className="hFont text-xl font-bold ">Teachers Details</h2>
		  <div className="flex ga-4 flex-wrap">
    <SubjectTeacherDetails/>
        </div>
        </div>
        </div>
  )
}

export default SessionDetails