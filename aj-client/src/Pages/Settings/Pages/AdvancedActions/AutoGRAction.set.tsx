import { Switch } from '@/shdcn/components/ui/switch'
import SettingsLabelWrapper from '../../components/Components/SettingsLabelWrapper.set'
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import useUpdateAdvancedSettings from '@/Hooks/Settings/useUpdateAdvancedSettings'
import RequestLoading from '@/Global/Loaders/RequestLoding'
import { InsertGlobalValues } from '@/app/Slices/globalSlice'

const AutoGRAction = () => {
const {AdvancedSettings} = useAppSelector(s=>s.global)
const {mutate,isLoading} =useUpdateAdvancedSettings()
const dispatch =useAppDispatch()
const HandleChange = (value:boolean)=>{
dispatch(InsertGlobalValues({AdvancedActions:{sortGR:value}}))
mutate({...AdvancedSettings,autoGR:value})
}


  return (
    <SettingsLabelWrapper className="!w-[70%] text-lg"  label="Automatic GRNO Assignment" description="Automatically assign a unique General Register Number (GRNO) to each new student upon admission. Turn this on to streamline the registration process.">
<div className="flex justify-end gap-2 items-center w-[30%] ">
  {isLoading&&<RequestLoading size='16' stroke='2' dark/>}
    <p className="text-xs">Off</p>
<Switch disabled={isLoading} checked={AdvancedSettings.autoGR} onCheckedChange={HandleChange}/>
    <p className="text-xs">On</p>
</div>
    </SettingsLabelWrapper>
  )
}

export default AutoGRAction