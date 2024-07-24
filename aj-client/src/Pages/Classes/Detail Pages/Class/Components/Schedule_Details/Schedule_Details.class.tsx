import FilterBar from "./FilterBar.class"
import { Separator } from "@/shdcn/components/ui/separator";
import { useAppSelector } from "@/app/ReduxHooks";
import { Iteacher } from "@/app/Types/ITeacherRegisteration";
import { Iclass_section_teachers } from "@/app/Types/Iclass_detailed";
const Schedule_Details = () => {
  let {sections} =useAppSelector(s=>s.classDetailed.payload)
  let {selected_index:i} =useAppSelector(s=>s.classDetailed.Filters.Sections)
  let ClassTeacher =useAppSelector(s=>s.classDetailed.payload?.sections[i]?.ClassTeacher) as Iteacher
  let payload:Iclass_section_teachers[] = [{Teachers:[ClassTeacher ],subject:"Class Teacher"} ,...(sections[i]?.Subjects_teachers||[]) ]
  return (
    <div className="flex flex-col w-full bg-[var(--box)] rounded-md p-6 gap-4">
          {/* Filter Bar */}
        <FilterBar/>

        <Separator  />
		  <div className="flex gap-4 flex-wrap">

        {

          payload.map((data)=>{
            return <div className=" flex flex-col w-[30%] rounded-md  ">
                  <div className="flex w-full gap-2 flex-wrap">
									<div className="p-2">
										<h1 className="hFont text-lg font-semibold text-gray-600">{data.subject}</h1>
                    {
                      data.Teachers.map((teacher:Iteacher)=>{
                        return <div className="flex gap-2 items-center">
                          <div className="flex  gap-1">
                            <h1 className="hFont  font-semibold leading-tight">{teacher?.firstName}</h1>
                            <h1 className="hFont  font-semibold leading-tight">{teacher?.lastName}</h1>
                          </div>
                          <img src={teacher?.photo} className="avatar avatar-sm w-6 h-6 rounded-full" alt=""/>
                        </div>
                      })
                    }
							
                    </div>
                    </div>
								</div>
          })
        }
        </div>
        </div>
  )
}

export default Schedule_Details