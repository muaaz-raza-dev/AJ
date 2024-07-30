import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedCDFilters } from "@/app/Slices/ClassDetailedSlice";
import { Select } from "antd";
const FilterBar = () => {
  let {selected_index} =useAppSelector(s=>s.classDetailed.Filters.Sections)
  let dispatch =useAppDispatch()
  let {sections} =useAppSelector(s=>s.classDetailed.payload)
  let FilterSections = (index:number)=>{
    dispatch(RedCDFilters({type:"Sections",selected_index:index}))
  }
  return (
    <div className="flex justify-between items-center w-full">
    <h1 className="hFont font-bold text-2xl  text-dark !self-end ">
      Session Based Details
    </h1>
    <div className="flex gap-2">
      <Select
      onChange={(e)=>FilterSections(+e)}
        value={selected_index}
        style={{ width: 120 }}
        options={
          sections.map((opt,index)=>({value:index,label:opt.name}))}
      />
    </div>
  </div>
  )
}

export default FilterBar