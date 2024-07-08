import { TimePicker } from 'antd';
import LabelWrapper from '../Helpers/LabelWrapper.dash';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';


const Teacher_Schedule = () => {
  let {setValue,watch} = useFormContext()
 let scheduleEnd =watch("schedule.End")
 let scheduleStart =watch("schedule.Start")
  return (
    <LabelWrapper required label="Schedule">
    <TimePicker.RangePicker value={[!scheduleStart?dayjs():dayjs(scheduleStart,'HH:mm'),scheduleEnd?dayjs(scheduleEnd,'HH:mm'):dayjs()]} className='h-full w-full' onChange={(e)=>{
      setValue("schedule.Start",`${e[0]?.hour()}:${e[0]?.minute()}`)
      setValue("schedule.End",`${e[1]?.hour()}:${e[1]?.minute()}`)
    }} showNow showHour showMinute color='red' needConfirm={false}/>
    </LabelWrapper >
)
}

export default Teacher_Schedule