import { Bar, Line } from 'react-chartjs-2';
import ReusableBarChart, { ReusableBarChartProps } from "@/components/charts/ReusableBarChart";
import ReusableLineChart, { ReusableLineChartProps } from "@/components/charts/ReusableLineChart";
import ReusablePieChart, { ReusablePieChartProps } from "@/components/charts/ReusablePieChart";
import ReusablePieChartdonut, { ReusablePieChartdonutProps } from "@/components/charts/ReusablePieChartdonut";
// import {  
//   GoalChartConfig
// } from '@/components/charts/ChartData';
import { useTranslatedChartConfig } from '@/components/charts/ChartData';

export const GoalChart = ({ goal ,Chart,name,desc,unit}) => {
  const {GoalChartConfig} = useTranslatedChartConfig();
  // Create a new config object based on GoalChartConfig
  const updatedConfig = {
    ...GoalChartConfig,
    assessment: {
        ...GoalChartConfig.assessment,
        y_label: `${GoalChartConfig.assessment.y_label} in ${unit}`, // Update the y_label with unit
        color: `Goal`,
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
const AssesmentPieChart: ReusablePieChartProps = {
    data: goal,
    config: updatedConfig,
    title: name,
    description: desc,
    dataKey: "current_value"
  };
  const AssesmentPieChartdonut1: ReusablePieChartdonutProps = {
    data: goal,
    config: updatedConfig,
    title: name,
    description: desc,
    dataKey: "current_value",
    xAxisKey: "Date"
  };
  return (
    <div className="w-full h-full">
      {Chart === 'Line Graph' && <ReusableLineChart {...AssesmentLineChart} />}
      {Chart === 'Bar Graph' && <ReusableBarChart {...AssesmentbarChartProps} />}
      {Chart === 'Pie Graph' && <ReusablePieChart {...AssesmentPieChart} />}
      {Chart === 'Donut Graph' && <ReusablePieChartdonut {...AssesmentPieChartdonut1} />}
    </div>
  );
  
};
