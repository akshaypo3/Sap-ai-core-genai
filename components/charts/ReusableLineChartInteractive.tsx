"use client"
import React from "react"
import {CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts"
import CustomTooltip from "@/components/materiality/assessments/CustomTooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Define types for the props
export interface DataPoint {
  [key: string]: string | number;
}

interface ChartItemConfig {
  label: string;
  color: string;
}

export interface ReusableLineChartInteractiveProps {
  data: DataPoint[];
  config: {
    [key: string]: ChartItemConfig;
  };
  title: string;
  description: string;
  fy_dataKey: string;
  sy_dataKey: string;
  xAxisKey?: string;
}

const ReusableLineChartInteractive: React.FC<ReusableLineChartInteractiveProps> = ({ 
  data, 
  config, 
  title, 
  description, 
  fy_dataKey,
  sy_dataKey,
  xAxisKey
}) => {
    const fmeasure=fy_dataKey;
    const smeasure=sy_dataKey;
    const data1=["fmeasure","smeasure"];
    const chartConfig = config;
    console.log(chartConfig);
    const flabel=chartConfig.fmeasure.label;
    const slabel=chartConfig.smeasure.label;
    const xlabel=chartConfig.xlabel.label
    const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("fmeasure")

  const total = React.useMemo(
    () => ({
      fmeasure: data.reduce((sum, item) => {
        const score = typeof item[fmeasure] === 'string'
              ? parseFloat(item[fmeasure])
              : item[fmeasure];
        return sum + (score || 0);
    }, 0),
    smeasure: data.reduce((sum, item) => {
        const score = typeof item[smeasure] === 'string'
              ? parseFloat(item[smeasure])
              : item[smeasure];
        return sum + (score || 0);
      }, 0),
    }),
    []
  )
  console.log(activeChart);
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
        <div className="flex">
          {data1.map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold justify-center leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
            className="aspect-auto h-[400px] w-full"
          
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis 
          label={{value:activeChart === "fmeasure"?flabel:slabel, angle: -90, position: 'insideLeft', offset: 5, fill: '#666', fontSize: 14,textAnchor: 'middle',fontWeight: 'bold'}} tick={{ fill: '#666', fontSize: 12 }}
          />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip/>}
            />
            <Line
              dataKey={activeChart === "fmeasure"?fy_dataKey:sy_dataKey}
              type="monotone"
              stroke="green"
              fill='green'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 font-medium leading-none">
        {xlabel}
      </div>
      {/* <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div> */}
    </CardFooter>
    </Card>
  )
}

export default ReusableLineChartInteractive