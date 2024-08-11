import { TimePicker } from 'antd';
import LabelWrapper from '../Helpers/LabelWrapper.dash';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';


const Teacher_Schedule = () => {
  let {setValue,watch} = useFormContext()
 let scheduleEnd =watch("schedule.End")
 let scheduleStart =watch("schedule.Start")
  return (
    <LabelWrapper  label="Schedule">
    <TimePicker.RangePicker  
    value={[!scheduleStart?dayjs("07:50","HH:mm"):dayjs(scheduleStart,'HH:mm'),scheduleEnd?dayjs(scheduleEnd,'HH:mm'):dayjs("13:00",'HH:mm')]} className='h-full w-full dark:!bg-darker dark:!text-white dark:!border-darker dark:placeholder:!text-gray-300 antd-selectBar' onChange={(e)=>{
      setValue("schedule.Start",`${e[0]?.hour()}:${e[0]?.minute()}`)
      setValue("schedule.End",`${e[1]?.hour()}:${e[1]?.minute()}`)
    }} showNow showHour showMinute color='red' needConfirm={false}/>
    </LabelWrapper >
)
}

export default Teacher_Schedule