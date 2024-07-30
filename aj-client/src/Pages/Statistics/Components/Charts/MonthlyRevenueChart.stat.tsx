import {  Bar, BarChart, CartesianGrid, LabelList, Rectangle, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shdcn/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shdcn/components/ui/chart"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedstInsertFilters } from "@/app/Slices/StatsSlice"
import useGetMonthlyRevenueReport from "@/Hooks/Stats/useGetMonthlyRevenueReport"
import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"




const chartConfig = {
    revenue: {
      label:"Revenue",
      color: "var(--dark)",
    },
} satisfies ChartConfig


const CustomBar = (props:any) => {
  const {  y,  height, fill } = props;
  const minHeight = 8; // Minimum height for zero values
  const adjustedHeight = (height < minHeight||height==0) ? minHeight : height;
  
  return <Rectangle {...props} height={adjustedHeight} y={y + height - adjustedHeight} fill={fill} />;
};

const MonthlyRevenueChart = () => {
  let {chartData,average} =useAppSelector(s=>s.stats.payload.monthly)
  let {isLoading} =useAppSelector(s=>s.stats.filters.monthly)
  
  return (
    <div className="w-[50%] max-lg:w-full py-6 px-4 bg-box  rounded shadow-md p-2">
<FilterBarAndReport/>
{isLoading ?
<SkeletonChartsLoading/>
 : 
<Card className="border-none dark:bg-box ">
          <CardHeader>
            <CardDescription className="dark:text-gray-400">
    Avg per month
    <h3 className="font-bold text-3xl leading-tight text-dark">{average} PKR</h3>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer config={chartConfig} >
              <BarChart accessibilityLayer  data={chartData} >
                <CartesianGrid  vertical={false} />
                <XAxis
                  dataKey="month"
                  type="category"
                  tickFormatter={(value)=>value.slice(0,3)}
                  tickLine={false}
                  tickMargin={3}
                  axisLine={false}
                />
            
                <ChartTooltip content={<ChartTooltipContent  indicator="line"  /> }
                />
                  
                <Bar dataKey="revenue" shape={<CustomBar/>}   fillOpacity={1} fill="var(--darker)" 
                
                
                className="dark:bg-white dark:text-white"   radius={8} >
                  <LabelList offset={14}  dataKey="revenue"  position="top"  formatter={(value:string)=>`${value}`}  fontSize={12} />
         
                  </Bar>


              </BarChart>
            </ChartContainer>
          </CardContent>
        
    </Card>
}  
    
        </div>
  )
}



const FilterBarAndReport = ()=>{
  let {available,selected} =useAppSelector(s=>s.stats.filters.monthly)
  let {mutate ,isLoading} = useGetMonthlyRevenueReport()
  let dispatch =useAppDispatch()
  useEffect(() => {
  if(selected) mutate(selected)
  }, [selected])
  const handleChange = (type:string)=>{
    dispatch(RedstInsertFilters({type:"monthly",InsertType:"selected",selected:type,isLoading:true}))
  }
 return <div className="flex justify-between items-center w-full  gap-8 max-lg:gap-4 flex-wrap">
 <h1 className="text-dark text-xl  font-bold  whitespace-nowrap ">Revenue Report </h1>
 
 <div className="flex gap-2  items-center flex-wrap justify-end">
  {available.map((t,index)=>(
    <button key={`${t} ${index}`} disabled={isLoading} onClick={()=>handleChange(t)} className={`px-3 py-1 rounded-md text-sm  whitespace-nowrap   font-medium 
       ${t==selected ?" bg-dark text-light scale-95":"bg-light text-dark"}    `}>{t}</button>
  ))
  }
 </div>
 
     
 
 </div> 
}


export const SkeletonChartsLoading = ()=>{
  return  <Skeleton count={5}   className=' dark:bg-dark h-[10%] flex justify-between flex-wrap gap-4'/>
    
}
export default MonthlyRevenueChart