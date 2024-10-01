// Define types for our data
type AssessmentData = {
    x: number;
    y: number;
    z: number;
  };
  
 
  
  type ChartConfig = {
    [key: string]: {
      x_label: string;
      y_label: string;
      color: string;
    };
  };
  
  // Monthly Sales Data
  const assessmentData: AssessmentData[] = [
    { x: 0.1, y: 0.2, z: 200 },
    { x: 0.6, y: 0.7, z: 260 },
    { x: 0.9, y: 0.8, z: 400 },
    { x: 0.6, y: 0.9, z: 280 },
    { x: 0.7, y: 0.6, z: 500 },
    { x: 0.8, y: 0.9, z: 200 },
  ];
  
  
  const assessmentChartConfig: ChartConfig = {
    assessment: {
      x_label: "Code",
      y_label: "Impact Score",
      color: "hsl(var(--chart-1))",
    },
  };

  const ScattaredassessmentChartConfig: ChartConfig = {
    assessment: {
      x_label: "Impact Score",
      y_label: "Financial Score",
      color: "hsl(var(--chart-1))",
    },
  };
  const PieassessmentChartConfig: ChartConfig = {
    assessment: {
      x_label: "Status",
      y_label: " ",
      color: "hsl(var(--chart-1))",
    },
  };
  const GoalChartConfig: ChartConfig = {
    assessment: {
      x_label: "Date",
      y_label: "Actual Value",
      color: "hsl(var(--chart-1))",
    },
  };
//   const InteactiveChartConfig: ChartConfig = {
//     assessment: {
//       x_label: "Impact Score",
//       y_label: "Financial Score",
//       color: "hsl(var(--chart-1))",
//     },
//   };
interface ChartItemConfig {
    label: string;
    color: string;
  }
  
  interface ChartConfig1 {
    [key: string]: ChartItemConfig; 
  }
  
  
  const InteactiveChartConfig: ChartConfig1 = {
    views: {
      label: "Page Views",
      color: "hsl(var(--chart-3))"
    },
    fmeasure: {
      label: "Impact Score",
      color: "hsl(var(--chart-1))",
    },
    smeasure: {
      label: "Financial Score",
      color: "hsl(var(--chart-2))",
    },
    xlabel: {
        label: "Code",
        color: "hsl(var(--chart-2))",
      }
  };
  export {
    assessmentData,
    assessmentChartConfig,
    ScattaredassessmentChartConfig,
    PieassessmentChartConfig,
    InteactiveChartConfig,
    GoalChartConfig
  };
  export type {
    AssessmentData,
      ChartConfig,
      ChartConfig1
    };
  