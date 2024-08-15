import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/shdcn/components/ui/chart"
import { useAppSelector } from "@/app/ReduxHooks"
import { format } from "date-fns"

const chartColors=[
  "#2f1660",  // Base Color
  "#402080",  // Slightly Lighter
  "#5934a0",  // Lighter
  "#7048c0",  // Even Lighter
  "#26124e",  // Slightly Darker
  "#1f0e3d",  // Darker
  "#463277",  // Muted
  "#594088"   // Muted Lighter
]


const chartConfig = {
} satisfies ChartConfig

export function ChartFormRD() {
  const {filters:{Dates:{start,end}},payload} =useAppSelector(s=>s.detailedRevenue)
  const chartData = React.useMemo(()=>payload.map((c,i)=>({...c,fill:chartColors[i%(chartColors.length-1)]})),[payload])
  const totalRevenue = React.useMemo(() =>  payload.reduce((acc, curr) => acc + curr.total, 0), [payload])

  return (
    <Card className="flex flex-col w-[29%]">
      <CardHeader className="flex flex-col !items-start justify-start w-full">
        <CardTitle className="">Pie Chart Overview</CardTitle>
        <CardDescription>{format(start, "PPP")} - {format(end,"PPP")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1  py-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip

              content={<ChartTooltipContent animationDuration={350} />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="Name"
              innerRadius={65}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRevenue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Revenue in PKR
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
