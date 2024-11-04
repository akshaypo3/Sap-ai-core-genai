"use client"
import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import CustomTooltip from "@/components/materiality/assessments/CustomTooltip";
import { ChartContainer } from '../ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { json } from 'stream/consumers';

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
      
      const processedData = data.map((entry) => ({
        ...entry,
        [x_dataKey]: entry[x_dataKey] != null ? entry[x_dataKey] : 0,
        [y_dataKey]: entry[y_dataKey] != null ? entry[y_dataKey] : 0
    }));
  return (  
    <Card style={{width:'100%',height:'100%'}}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
      <ChartContainer config={config} style={{marginTop:'50px'}}>
    <ScatterChart> 
      <CartesianGrid />
      <XAxis type="number" dataKey={x_dataKey} label={{ value: xlabel, position: 'insideBottom', offset: 0, fill: '#666', fontSize: 14,textAnchor: 'middle',fontWeight: 'bold'}} tick={{ fill: '#666', fontSize: 10 }}/>
      <YAxis type="number" dataKey={y_dataKey}  label={{value: ylabel, angle: -90, position: 'insideLeft', offset: 5, fill: '#666', fontSize: 14,textAnchor: 'middle',fontWeight: 'bold'}} tick={{ fill: '#666', fontSize: 10 }}/>
      <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={processedData} fill="#8884d8">
        {processedData.map((entry, index) => (
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