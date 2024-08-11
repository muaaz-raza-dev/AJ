import RequestLoading from '@/Global/Loaders/RequestLoding'
import SettingsLabelWrapper from '../../components/Components/SettingsLabelWrapper.set'
import { InsertGlobalValues } from '@/app/Slices/globalSlice'
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import useUpdateAdvancedSettings from '@/Hooks/Settings/useUpdateAdvancedSettings'
import { Switch } from '@/shdcn/components/ui/switch'

const RestrictLoginAction = () => {
const {mutate,isLoading} =useUpdateAdvancedSettings()
const dispatch =useAppDispatch()
const {AdvancedSettings} = useAppSelector(s=>s.global)
const HandleChange = (value:boolean)=>{
dispatch(InsertGlobalValues({AdvancedActions:{isTemporaryBlocked:value}}))
mutate({...AdvancedSettings,isTemporaryBlocked:value})
}
  return (
    <SettingsLabelWrapper className="!w-[70%] text-lg "  label="Restrict Login" description="
    It will block all the un-logined user to login to thier accounts .Additionally Already logined users will be logged out automatically. ">
    <div className="flex justify-end gap-2  items-center w-[30%] ">
      {isLoading&&<RequestLoading size='16' stroke='2' dark/>}
        <p className="text-xs">Off</p>
    <Switch disabled={isLoading} checked={AdvancedSettings.isTemporaryBlocked} onCheckedChange={HandleChange}/>
        <p className="text-xs">On</p>
    </div>
        </SettingsLabelWrapper>
  )
}

export default RestrictLoginAction