"use client"
import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import CustomTooltip from "@/components/materiality/assessments/CustomTooltip";

import { UUID } from "crypto";
interface AssessmentData {
  assessment_id: UUID;
}

/* this is the format of the data should be*/
const data = [
  { x: 0.1, y: 0.2, z: 200 },
  { x: 0.6, y: 0.7, z: 260 },
  { x: 0.9, y: 0.8, z: 400 },
  { x: 0.6, y: 0.9, z: 280 },
  { x: 0.7, y: 0.6, z: 500 },
  { x: 0.8, y: 0.9, z: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
export default  function IroScatterchartclient(assessmentData:any) {

  const assessmentDatafinal1=assessmentData.data.value;
  //const assessmentDatafinal1 = JSON.parse(assessmentDatafinal);
console.log(assessmentDatafinal1);
  return (  
    <>
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
      <XAxis type="number" dataKey="impact_score" name="Impact Score" label={{ value: 'Impact Score', position: 'insideBottom', offset: -15, fill: '#666', fontSize: 14,textAnchor: 'middle'}} tick={{ fill: '#666', fontSize: 12 }}/>
      <YAxis type="number" dataKey="financial_score" name="Financial Score" label={{value: 'Financial Score', angle: -90, position: 'insideLeft', offset: 5, fill: '#666', fontSize: 14,textAnchor: 'middle'}} tick={{ fill: '#666', fontSize: 12 }}/>
      <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={assessmentDatafinal1} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Scatter>
    </ScatterChart>
    </>
  );
}

IroScatterchartclient.demoUrl = 'https://codesandbox.io/p/sandbox/scatter-chart-with-cells-jjxq8y';