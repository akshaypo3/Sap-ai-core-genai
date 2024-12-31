import React from "react";
import { RadialBarChart, RadialBar, PolarGrid, PolarRadiusAxis, Label } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface ChartCardProps {
  value: string;
  bar_value: number; 
  label: string;
  color: string;
  isSelected: boolean; 
  onClick: () => void; 
  dbCardSelected : any;
}

const ChartCard: React.FC<ChartCardProps> = ({ value, bar_value, label, color, isSelected, onClick, dbCardSelected }) => {
  const maxValue = 100;
  const angleRange = (bar_value / maxValue) * 360; 
  const chartData = [{ label, value: bar_value, fill: color }];
  
  const cardClassNames = `flex w-full justify-center items-center p-2 border shadow transition-all duration-300 
  ${isSelected || dbCardSelected ? 'border-green-500 bg-green-50' : 'border-gray-300'}`

  const cardSelected = `${dbCardSelected ? 'border-green-500 bg-green-50' : 'border-gray-300'}`

  return (
      <Card className={cardClassNames} onClick={onClick}>
      <CardContent className="flex justify-center items-center p-0">
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={90 + angleRange} 
          innerRadius={50}
          outerRadius={70}
          width={120}
          height={120}
        >
          <PolarGrid radialLines={false} stroke="none" />
          <RadialBar
            dataKey="value"
            background
            cornerRadius={5}
            fill={color}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                        className="fill-muted-foreground text-sm font-semibold"
                      >
                        {label}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
