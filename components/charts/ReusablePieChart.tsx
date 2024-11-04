"use client"
import React from "react"
import { Pie, PieChart, Label, Cell } from "recharts"
import CustomTooltip from "@/components/materiality/assessments/CustomTooltip";
import CustomTooltipGoal from "@/components/charts/CustomTooltip";
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
import { AddValue } from "@/components/goals/buttons";

// Define types for the props
export interface DataPoint {
  [key: string]: string | number;
}

export interface ChartConfigItem {
    x_label: string;
    y_label: string;
    color: string;
}

export interface ReusablePieChartProps {
  data: DataPoint[];
  config: {
    [key: string]: ChartConfigItem;
  };
  title: string;
  description: string;
  dataKey: string;
}

const ReusablePieChart: React.FC<ReusablePieChartProps> = ({ 
  data, 
  config, 
  title, 
  description, 
  dataKey
}) => {
    const chartConfig = config.assessment;
    const label=chartConfig.y_label;
    const colors = [
      "#90EE90", "#98FB98", "#7CFC00", "#7FFF00", "#ADFF2F",
      "#32CD32", "#228B22", "#556B2F", "#6B8E23", "#3CB371",
      "#2E8B57", "#006400"
    ];
    const buttonText=chartConfig.color;
    const len=data.length-1;
    let tooltip;

    if (buttonText === "Goal") {
      tooltip = (
        <ChartTooltip
            cursor={false}  
            content={<CustomTooltipGoal/>}
          />
      );
    } else {
      tooltip=(
      <ChartTooltip
            cursor={false}
            content={<CustomTooltip/>}
          /> 
      );
    }

  return (
    <Card className="flex flex-col">
    <CardHeader  className="flex justify-between">
<div className="flex justify space-x-2 mt-1">
<CardTitle>{title}</CardTitle>
</div>
<div className="flex justify-between items-center mt-0 w-full"> {/* Ensure full width */}
<CardDescription className="mr-1"> {/* Add some margin to separate from the button */}
    {description}
</CardDescription>
  {buttonText === "Goal" && <AddValue className="py-2 px-4" goalId={data[len]} />}
</div>
</CardHeader>
    <CardContent>
      <ChartContainer
        config={config}
        className="mx-auto aspect-square max-h-[210px]"
      >
        <PieChart>
        {tooltip}
          <Pie data={data} dataKey={dataKey} nameKey="browser"
              outerRadius={105}>
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

export default ReusablePieChart