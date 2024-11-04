"use client"
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
export default  function IroBarchart(assessmentData:any) {

  const assessmentDatafinal=assessmentData.data.value;
  const assessmentDatafinal1 = JSON.parse(assessmentDatafinal);
console.log(assessmentDatafinal1);
  return (  
    <>
	<BarChart
          width={900}
          height={500}
          data={assessmentDatafinal1}
          margin={{
            top: 75,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="code"/>
          <YAxis label={{value: 'Score', angle: -90, position: 'insideLeft', offset: 5, fill: '#666', fontSize: 14,textAnchor: 'middle'}} tick={{ fill: '#666', fontSize: 12 }}/>
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Bar dataKey="impact_score" name="Impact Score" fill="#4A90E2" activeBar={<Rectangle fill="#4A90E2" stroke="blue" />} />
          <Bar dataKey="financial_score" name="Financial Score" fill="#F5A623" activeBar={<Rectangle fill="#F5A623" stroke="purple" />} />
        </BarChart>
    </>
  );
}

IroBarchart.demoUrl = 'https://codesandbox.io/p/sandbox/scatter-chart-with-cells-jjxq8y';