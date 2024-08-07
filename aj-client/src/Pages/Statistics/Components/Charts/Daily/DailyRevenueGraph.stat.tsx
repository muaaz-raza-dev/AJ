import { Area, AreaChart,  CartesianGrid,  Tooltip, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shdcn/components/ui/card"
import {
  ChartConfig,
  ChartContainer,

} from "@/shdcn/components/ui/chart"
import DailyGraphFilterBar from "./DailyGraphFilterBar.stat"
import { useAppSelector } from "@/app/ReduxHooks"
import { SkeletonChartsLoading } from "../MonthlyRevenueChart.stat"

const chartConfig = {
  revenue:{
    label: "day",
    color: "var(--darker)",
  },
} satisfies ChartConfig

const DailyRevenueGraph = () => {
let {average,chartData} = useAppSelector(s=>s.stats.payload.daily)
let {isLoading} = useAppSelector(s=>s.stats.filters.daily)
  return (
       
        <div className="w-[50%] max-lg:w-full py-6 px-4  bg-box rounded   p-2 flex  shadow-md flex-col ">
        <div className="flex justify-between items-center w-full  gap-8">
    <h1 className="text-dark text-xl  font-bold"> Daily Report </h1>
    
    <DailyGraphFilterBar/>
    
    </div>
    {isLoading ?
<SkeletonChartsLoading/>
 : 
 <Card className="border-none w-full dark:bg-box">
 <CardHeader>
   <CardDescription>Avg per day</CardDescription>
   <CardTitle>
     <h3 className="font-bold text-3xl leading-tight text-dark">{average} PKR</h3>
   </CardTitle>
 </CardHeader>
 <CardContent className="p-0">
   <ChartContainer config={chartConfig}>
     <AreaChart accessibilityLayer data={chartData}>
       <CartesianGrid vertical={false} />
       <XAxis
         dataKey="day"
         tickLine={false}
         axisLine={false}
         tickMargin={8}
         tickFormatter={(value) => value} // Ensure this is correctly set
         textAnchor="end" // Align the labels to the end
       />
      
       <Tooltip content={<CustomTooltip/>} />
       <defs>
              <linearGradient id="fillDesktop" x1="0" y1="1" x2="0" y2="0">
                <stop offset="5%" stopColor="var(--darker)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="var(--darker)" stopOpacity={0.9} />
              </linearGradient>
              </defs>
       <Area
         dataKey="revenue"
         type="bump"
         fill="url(#fillDesktop)"
         fillOpacity={1}
         stroke="var(--dark)"
         strokeWidth={3}
         >

          </Area>
     </AreaChart>
   </ChartContainer>
 </CardContent>
</Card>
 }
    </div> 
  )
}


const CustomTooltip = ({ active, payload, label }:any) => {

  if (active && payload && payload.length) {
    
    return (
      <div className="custom-tooltip p-2 bg-white dark:bg-dark dark:text-white border rounded shadow-md">
        <div className="flex gap-2">
          <div className={`h-2 w-2 rounded bg-darker`}></div>
          <div className="font-bold hFont">
        <p className="">{`Day: ${label}`}</p>
        <p className="">{`Revenue: ${payload?.[0].payload.revenue} PKR`}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
export default DailyRevenueGraph