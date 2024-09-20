"use client"
import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import CustomTooltip from "@/components/materiality/assessments/CustomTooltip";
import { ChartContainer } from '../ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export interface DataPoint {
    [key: string]: string | number;
  }
  
  export interface ChartConfigItem {
      x_label: string;
      y_label: string;
      color: string;
  }
  
  export interface ReusableScatteredChartProps {
    data: DataPoint[];
    config: {
        [key: string]: ChartConfigItem;
      };
    title: string;
    description: string;
    x_dataKey: string;
    y_dataKey:string;
  }
/* this is the format of the data should be*/


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const ReusableScatteredChart: React.FC<ReusableScatteredChartProps> = ({ 
    data, 
    config, 
    title, 
    description, 
    x_dataKey,
    y_dataKey
  }) => {
      const chartConfig = config.assessment;
      const xlabel=chartConfig.x_label;
      const ylabel=chartConfig.y_label;
      
  return (  
    <Card style={{ height: '500px' }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
      <ChartContainer config={config} style={{ height: '400px',width:'800px' }}>
    <ScatterChart
      width={900}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    > 
      <CartesianGrid />
      <XAxis type="number" dataKey={x_dataKey} label={{ value: xlabel, position: 'insideBottom', offset: -15, fill: '#666', fontSize: 14,textAnchor: 'middle',fontWeight: 'bold'}} tick={{ fill: '#666', fontSize: 12 }}/>
      <YAxis type="number" dataKey={y_dataKey}  label={{value: ylabel, angle: -90, position: 'insideLeft', offset: 5, fill: '#666', fontSize: 14,textAnchor: 'middle',fontWeight: 'bold'}} tick={{ fill: '#666', fontSize: 12 }}/>
      <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={data} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Scatter>
    </ScatterChart>
    </ChartContainer>
    </CardContent>
    </Card>
  );
}

export default ReusableScatteredChart