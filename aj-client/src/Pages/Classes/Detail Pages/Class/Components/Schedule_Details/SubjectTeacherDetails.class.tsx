import { useAppSelector } from '@/app/ReduxHooks'
import { Iclass_section_teachers } from '@/app/Types/Iclass_detailed'
import { Iteacher } from '@/app/Types/ITeacherRegisteration'

const SubjectTeacherDetails = () => {
  let {sections} =useAppSelector(s=>s.classDetailed.payload)
  let {selected_index:i} =useAppSelector(s=>s.classDetailed.Filters.Sections)
  let ClassTeacher =useAppSelector(s=>s.classDetailed.payload?.sections[i]?.ClassTeacher) as Iteacher
  let payload:Iclass_section_teachers[] = [{Teachers:[ClassTeacher ],subject:"Class Teacher"} ,...(sections[i]?.Subjects_teachers||[]) ]
  return (
        payload.map((data: Iclass_section_teachers) => {
            return <div className=" flex flex-col w-[30%] max-md:w-[48%] rounded-md  ">
              <div className="flex w-full  flex-wrap">
                <div className="p-2 flex flex-col gap-1">
                  <h1 className="hFont  whitespace-nowrap dark:text-gray-200    font-semibold text-gray-600">{data.subject}</h1>
                  {
                    data.Teachers.map((teacher: Iteacher) => {
                      return <div className="flex gap-2 items-center">
                        <img src={teacher?.photo} className="avatar avatar-sm w-6 h-6 rounded-full" alt="" />
                        <div className="flex  gap-1">
                          <h1 className="hFont whitespace-nowrap    font-semibold leading-tight">{teacher?.firstName}</h1>
                          <h1 className="hFont  whitespace-nowrap  font-semibold leading-tight">{teacher?.lastName}</h1>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          })
    
  )
}

export default SubjectTeacherDetails