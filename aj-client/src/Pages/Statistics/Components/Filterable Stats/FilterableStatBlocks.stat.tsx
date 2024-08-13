import { useAppSelector } from "@/app/ReduxHooks";
import { IfilterableStatsPayload } from "@/app/Types/IfilterableStats";
import { FC, useEffect } from "react";
import { buildStyles, CircularProgressbarWithChildren as CircularBar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ping } from 'ldrs'
import { Tooltip } from "antd";

const StatsBlock:FC<IfilterableStatsPayload&{trailColor?:string}> = ({  value,label,trailColor,percentage }) => {
  useEffect(() => {
    ping.register()
  }, [])
return (
    <div className={`p-2 min-w-[30%] rounded-lg border border-gray-200 dark:border-darker dark:text-white text-black shadow-sm opacity-90`}>
    <div className="flex px-2 gap-1 items-center">
    <div className="text-xl font-bold hFont">{label}</div>
<l-ping
  size="22"
  speed="2.5" 
  color="black" 
></l-ping>


    </div>
    <div className="flex justify-center py-2">
    <CircularBar value={+percentage?.toLocaleString()?.slice(0,4)||0} background={false} className=" w-28 h-28 " styles={buildStyles({
      textColor: '#000',
      pathTransitionDuration: 1,
      pathColor: trailColor || "#23104a",
      trailColor: '#23104a49',
      
    })} >
          <h1 className="font-bold hFont  cursor-default">{percentage?.toLocaleString()?.slice(0,4)||0}%</h1>
          <Tooltip title={`${value} Students`}>
          <div className="text-3xl font-bold cursor-default">{value}</div>
          </Tooltip>
          </CircularBar>
    </div>
  </div>
)};


const FilterableStatBlocks = () => {
  const {payload:stats} =useAppSelector(s=>s.fStats)
  return (
    <div className="flex gap-2  w-full">
{

    stats?.map((stat, index) => (
      <StatsBlock key={index} {...stat} trailColor={index==1?"#fd5353":"#3ec579"}/>
    ))
  }
  </div>
  )
}

export default FilterableStatBlocks