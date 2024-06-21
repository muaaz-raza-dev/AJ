import { TimePicker } from 'antd';
import LabelWrapper from '../Helpers/LabelWrapper.dash';


const Teacher_Schedule = () => {
  return (
    <LabelWrapper required label="Schedule">
    <TimePicker.RangePicker className='h-full w-full' onChange={(e)=>{console.log(e);
    }} showNow showHour showMinute/>
    </LabelWrapper >
)
}

export default Teacher_Schedule