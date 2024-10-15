"use client"
import React from "react"
import { Pie, PieChart, CartesianGrid, Label, XAxis, YAxis, Cell, LabelList } from "recharts"
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
interface GroupedStatus {
  status: string;
  count: number;
}

export interface ReusablePieChartdonutProps {
  data: DataPoint[];
  config: {
    [key: string]: ChartConfigItem;
  };
  title: string;
  description: string;
  dataKey: string;
  xAxisKey: string;
}

const ReusablePieChartdonut: React.FC<ReusablePieChartdonutProps> = ({ 
  data, 
  config, 
  title, 
  description, 
  dataKey,
  xAxisKey,
}) => {
    const chartConfig = config.assessment;
    const buttonText=chartConfig.color;
    const label=buttonText==="Goal"?chartConfig.y_label:chartConfig.x_label;
    const colors = [
      "#90EE90", "#7CFC00","#556B2F","#006400","#98FB98",  "#7FFF00", "#ADFF2F",
      "#32CD32", "#228B22",  "#6B8E23", "#3CB371",
      "#2E8B57", "#006400"
    ];
    const measure=dataKey;
    const len=data.length-1;
    const totalScore = data.reduce((sum, item) => {
      const score = typeof item[measure] === 'string'
            ? parseFloat(item[measure])
            : item[measure];
      return sum + (score || 0);
  }, 0);
  let result;
  let tooltip;
  if (buttonText === "Goal") {
  result = data;
  tooltip = (
    <ChartTooltip
        cursor={false}  
        content={<CustomTooltipGoal/>}
      />
  );
  }
  else{
    tooltip=(
      <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
      );
  const groupedByStatus = data.reduce<Record<string, GroupedStatus>>((acc, item) => {
    const status = item.status;
  
    // Calculate score (assuming the measure is defined)
    const score = typeof item[measure] === 'string' ? parseFloat(item[measure]) : item[measure];
  
    // Check if the status already exists in the accumulator
    if (!acc[status]) {
      // Initialize the entry if it doesn't exist
      acc[status] = { status, count: 0 }; // Create a new object with the status and totalScore
    }
  
    // Add the score to the totalScore for the current status
    acc[status].count += (score || 0); // Ensure score is a number
  
    return acc; // Return the accumulator for the next iteration
  }, {});
  
  // Convert the result into an array
  result = Object.values(groupedByStatus);
  //console.log(result);
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
            <Pie
              data={result}
              dataKey={dataKey}
              nameKey={xAxisKey}
              innerRadius={60}
              outerRadius={105}
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
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
                          {totalScore.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {"Total"}
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

export default ReusablePieChartdonut;