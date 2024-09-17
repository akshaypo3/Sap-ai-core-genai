import React from 'react';
import ChartSectionCompletion from '@/components/reporting/reports/ChartSectionCompletion';
import ChartQuestionCompletion from '@/components/reporting/reports/ChartQuestionCompletion';
import ChartIndicatorOverview from '@/components/reporting/reports/ChartIndicatorOverview';
import ChartGoalCompletion from '@/components/reporting/reports/ChartGoalCompletion';

const DashboardTopCardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ChartSectionCompletion/>
      <ChartQuestionCompletion/>
      <ChartIndicatorOverview/>
      <ChartGoalCompletion/>
    </div>
  );
};

export default DashboardTopCardSection;