import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedstInsertFilters } from "@/app/Slices/StatsSlice"
import useGetDailyRevenueReport from "@/Hooks/Stats/useGetDailyRevenueReport"
import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash"
import { useEffect } from "react"

const DailyGraphFilterBar = () => {
    let {selected,available} =useAppSelector(s=>s.stats.filters.daily)
    let dispatch =useAppDispatch()
    let {mutate} =useGetDailyRevenueReport()
    useEffect(() => {
      if(selected.month) mutate(selected)
    }, [selected.month])
    
    const HandleYearSelect = (year:string) => {
dispatch(RedstInsertFilters({type:"daily",InsertType:"selected",selected:{year:year,month:available[year][0]},isLoading:true}))
      }
      const HandleMonth = (month:string) => {
dispatch(RedstInsertFilters({type:"daily",InsertType:"selected",selected:{year:selected.year,month},isLoading:true}))
      }
  return (
    <div className="flex gap-2 w-[60%] h-max items-center">
    <CustomSelect_Reg
    setState={HandleMonth}
    state={selected.month}
    data={available[selected.year]}
    nosearch
    />
    <CustomSelect_Reg
    setState={HandleYearSelect}
    state={selected.year}
    data={Object.keys(available)}
    nosearch
    />
    </div>
  )
}

export default DailyGraphFilterBar