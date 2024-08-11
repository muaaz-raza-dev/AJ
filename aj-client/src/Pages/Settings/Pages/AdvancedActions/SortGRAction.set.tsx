import { Switch } from '@/shdcn/components/ui/switch'
import SettingsLabelWrapper from '../../components/Components/SettingsLabelWrapper.set'
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import useUpdateAdvancedSettings from '@/Hooks/Settings/useUpdateAdvancedSettings'
import RequestLoading from '@/Global/Loaders/RequestLoding'
import { InsertGlobalValues } from '@/app/Slices/globalSlice'

const SortGRAction = () => {
const {mutate,isLoading} =useUpdateAdvancedSettings()
const dispatch =useAppDispatch()
const {AdvancedSettings} = useAppSelector(s=>s.global)
const HandleChange = (value:boolean)=>{
dispatch(InsertGlobalValues({AdvancedActions:{sortGR:value}}))
mutate({...AdvancedSettings,sortGR:value})

}

  return (
    <SettingsLabelWrapper className="!w-[70%] text-lg "  label="GRNO Sorting by Admission Date" description="Automatically sort all student records by their admission date. Turn this on to organize students in chronological order based on when they were admitted.">
<div className="flex justify-end gap-2  items-center w-[30%] ">
  {isLoading&&<RequestLoading size='16' stroke='2' dark/>}

    <p className="text-xs">Off</p>
<Switch disabled={isLoading} checked={AdvancedSettings.sortGR} onCheckedChange={HandleChange}/>
    <p className="text-xs">On</p>
</div>
    </SettingsLabelWrapper>
  )
}

export default SortGRAction