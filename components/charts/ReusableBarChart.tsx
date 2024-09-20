"use client"
import React from "react"
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from "recharts"
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

export interface ChartConfigItem {
    x_label: string;
    y_label: string;
    color: string;
}

export interface ReusableBarChartProps {
  data: DataPoint[];
  config: {
    [key: string]: ChartConfigItem;
  };
  title: string;
  description: string;
  dataKey: string;
  xAxisKey?: string;
  
}

const ReusableBarChart: React.FC<ReusableBarChartProps> = ({ 
  data, 
  config, 
  title, 
  description, 
  dataKey,
  xAxisKey
}) => {
    const chartConfig = config.assessment;

  return (
    <Card style={{ height: '500px' }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} style={{ height: '400px',width:'800px' }}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              >
              <Label 
                value={chartConfig?.x_label || "X Axis"}
                offset={-5} 
                position="insideBottom" 
                style={{ textAnchor: 'middle', fontSize: 14, fontWeight: 'bold' }} 
              />
            </XAxis>
            <YAxis 
              tickLine={false}
              axisLine={false}
            >
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
            <Bar 
              dataKey={dataKey} 
              fill='green'
              radius={6} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {isTrendingUp ? "Trending up" : "Trending down"} by {Math.abs(trendPercentage)}% this month 
          <TrendIcon className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {footerText}
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default ReusableBarChart