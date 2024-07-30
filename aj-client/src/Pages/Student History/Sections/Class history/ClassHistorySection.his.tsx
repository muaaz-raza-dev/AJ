import { useAppSelector } from '@/app/ReduxHooks'
import { Separator } from '@/shdcn/components/ui/separator'
import { Tooltip } from 'antd'
import moment from 'moment'

const ClassHistorySection = () => {
  let history =useAppSelector(s=>s.studentHistory.payload.ClassHistory)
  let stdInformation =useAppSelector(s=>s.studentHistory.payload.studentInformation)
  let {Classes,Sessions} =useAppSelector(s=>s.global)
  return (
    <div className="w-full bg-[var(--box)] flex flex-col gap-4 p-3 pb-6 rounded dark:bg-dark dark:text-white">
    <h1 className="hFont text-3xl font-bold ">Acedmic Class history</h1>
<div className="w-full overflow-auto">

      <div className="min-w-full max-w-max max-md:w-full gap-1 flex  ">
      <div className=" w-[33%] max-md:w-full inline-flex   items-center justify-start gap-1 ">
        <div className=" w-[78%] bg-dark dark:bg-darker dark:text-white text-white p-2 rounded-lg">
        <h1 className="hFont font-bold">Admission  {stdInformation.firstAdmittedClass&&`in ${stdInformation?.firstAdmittedClass}`}</h1>
        <p className="text-sm"> {moment(stdInformation.DOA).format("D MMMM YYYY")}  </p>
        </div>
        <Tooltip title={stdInformation.firstAdmittedClass?"No records between the years":"To the first Class"}>
           <Separator className="bg-darker dark:bg-light h-1 rounded-full w-[20%]"/>
        </Tooltip>
        </div>
        

     {
      history.map((his,i)=>{
        let groupSize  = 3
        let groupIndex = Math.floor((i-1)/groupSize)+1
        let isEven  = groupIndex % 2 ==0 
        if(isEven) {
          return <div className=" w-[33%] max-md:w-full inline-flex   items-center justify-start gap-1 ">
        <div className=" w-[78%] bg-dark_dimmer text-white p-2 rounded-lg">
        <h1 className="hFont font-bold">{Classes[his.Class]} {his.name}</h1>
        <p className="text-sm"> {Sessions[his.Session]} </p>
        </div>
        {
          history[i+1] &&
          <Tooltip title={moment(history[i+1].Date).diff(moment(his.Date),"days") + " days"}>
          <Separator className="bg-darker dark:bg-light h-1 rounded-full w-[20%]"/>
          </Tooltip>
        }
        </div>
     
    }
      })
     }
</div>
    </div>

    </div>
  )
}

export default ClassHistorySection