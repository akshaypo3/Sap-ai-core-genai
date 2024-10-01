import { Bar, Line } from 'react-chartjs-2';
import ReusableBarChart, { ReusableBarChartProps } from "@/components/charts/ReusableBarChart";
import ReusableLineChart, { ReusableLineChartProps } from "@/components/charts/ReusableLineChart";
import {  
  GoalChartConfig
} from '@/components/charts/ChartData';

export const GoalChart = ({ goal ,Chart,name,desc,unit}) => {


  // Create a new config object based on GoalChartConfig
  const updatedConfig = {
    ...GoalChartConfig,
    assessment: {
        ...GoalChartConfig.assessment,
        y_label: `${GoalChartConfig.assessment.y_label} in ${unit}`, // Update the y_label with unit
    },
};
    
     const AssesmentbarChartProps: ReusableBarChartProps = {
     data: goal,
    config: updatedConfig,
    title: name,
    description: desc,
    dataKey: "current_value",
   xAxisKey: "recorded_at"
  };
  const AssesmentLineChart: ReusableLineChartProps = {
    data: goal,
    config: updatedConfig,
    title: name,
    description: desc,
    dataKey: "current_value",
    xAxisKey: "recorded_at"
  };

  return Chart === 'Line Graph' ? (
    <div className="w-full h-full"> 
    <ReusableLineChart {...AssesmentLineChart} />
    </div>
  ) : (
    <div className="w-full h-full"> 
    <ReusableBarChart {...AssesmentbarChartProps} />
    </div>
  );
};
