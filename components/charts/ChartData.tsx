import { getTranslations } from 'next-intl/server';

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

interface ChartItemConfig {
  label: string;
  color: string;
}

interface ChartConfig1 {
  [key: string]: ChartItemConfig; 
}
const assessmentData: AssessmentData[] = [
  { x: 0.1, y: 0.2, z: 200 },
  { x: 0.6, y: 0.7, z: 260 },
  { x: 0.9, y: 0.8, z: 400 },
  { x: 0.6, y: 0.9, z: 280 },
  { x: 0.7, y: 0.6, z: 500 },
  { x: 0.8, y: 0.9, z: 200 },
];


const useTranslatedChartConfig = async() => {
  const t = await getTranslations('charts'); 
  const assessmentChartConfig: ChartConfig = {
    assessment: {
      x_label: t('x_label_code'), 
      y_label: t('y_label_impact_score'),
      color: 'hsl(var(--chart-1))',
    },
  };

  const ScattaredassessmentChartConfig: ChartConfig = {
    assessment: {
      x_label: t('x_label_impact_score'),
      y_label: t('y_label_financial_score'),
      color: 'hsl(var(--chart-1))',
    },
  };

  const PieassessmentChartConfig: ChartConfig = {
    assessment: {
      x_label: t('x_label_status'),
      y_label: t('y_label_empty'), 
      color: 'hsl(var(--chart-1))',
    },
  };

  const GoalChartConfig: ChartConfig = {
    assessment: {
      x_label: t('x_label_date'),
      y_label: t('y_label_actual_value'),
      color: 'hsl(var(--chart-1))',
    },
  };

  const InteactiveChartConfig: ChartConfig1 = {
    views: {
      label: t('label_page_views'),
      color: 'hsl(var(--chart-3))',
    },
    fmeasure: {
      label: t('label_impact_score'),
      color: 'hsl(var(--chart-1))',
    },
    smeasure: {
      label: t('label_financial_score'),
      color: 'hsl(var(--chart-2))',
    },
    xlabel: {
      label: t('label_code'),
      color: 'hsl(var(--chart-2))',
    },
  };

  return {
    assessmentChartConfig,
    ScattaredassessmentChartConfig,
    PieassessmentChartConfig,
    GoalChartConfig,
    InteactiveChartConfig,
  };
};

export {
  assessmentData,
  useTranslatedChartConfig, 
};

export type {
  AssessmentData,
  ChartConfig,
  ChartConfig1,
};
