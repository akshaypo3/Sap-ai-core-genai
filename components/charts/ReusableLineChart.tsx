"use client"
import React from "react"
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts"
import CustomTooltip from "@/components/charts/CustomTooltip";
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

export interface ChartConfigItem {
    x_label: string;
    y_label: string;
    color: string;
}

export interface ReusableLineChartProps {
  data: DataPoint[];
  config: {
    [key: string]: ChartConfigItem;
  };
  title: string;
  description: string;
  dataKey: string;
  xAxisKey?: string;
  
}

const ReusableLineChart: React.FC<ReusableLineChartProps> = ({ 
  data, 
  config, 
  title, 
  description, 
  dataKey,
  xAxisKey
}) => {
    const chartConfig = config.assessment;
    const label=chartConfig.x_label;
    const label1=chartConfig.y_label;

  return (
    <Card >
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={config}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <YAxis>
          <Label 
                value={chartConfig?.y_label || "Y Axis"}
                angle={-90} 
                position="insideLeft" 
                style={{ textAnchor: 'middle', fontSize: 14, fontWeight: 'bold' }} 
              />
         </YAxis>
          <ChartTooltip
            cursor={false}  
            content={<CustomTooltip/>}
          />
          <Line
            dataKey={dataKey}
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
        {label}
      </div>
      {/* <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div> */}
    </CardFooter>
  </Card>
  )
}

export default ReusableLineChart