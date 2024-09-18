"use client"
import React from "react"
import { Pie, PieChart, Label, Cell } from "recharts"
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

export interface ReusablePieChartwithlabelProps {
  data: DataPoint[];
  config: {
    [key: string]: ChartConfigItem;
  };
  title: string;
  description: string;
  dataKey: string;
}

const ReusablewithlabelPieChart: React.FC<ReusablePieChartwithlabelProps> = ({ 
  data, 
  config, 
  title, 
  description, 
  dataKey
}) => {
    const chartConfig = config.assessment;
    const label=chartConfig.x_label;
    const colors = [
      "#90EE90", "#98FB98", "#7CFC00", "#7FFF00", "#ADFF2F",
      "#32CD32", "#228B22", "#556B2F", "#6B8E23", "#3CB371",
      "#2E8B57", "#006400"
    ];
    const defaultLabelColor = "#000000";
  return (
    <Card className="flex flex-col">
    <CardHeader className="items-center pb-0">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={config}
        className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip 
            content={<CustomTooltip/>}
          />
          <Pie data={data} dataKey={dataKey} label nameKey="browser">
          {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Pie>
        </PieChart>
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

export default ReusablewithlabelPieChart