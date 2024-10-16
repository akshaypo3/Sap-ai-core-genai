import React from 'react';
import { TooltipProps } from 'recharts';
import { useTranslations } from 'next-intl';

// Custom Tooltip component
const CustomTooltipGoal: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  const t = useTranslations('charts')
  if (active && payload && payload.length) {
    const { goal_id,recorded_at,current_value,progress,unit_of_measure } = payload[0].payload;

    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <p className="label"><strong>{t("Goal ID :")} </strong> {goal_id}</p>
        <p className="label"><strong>{t("Recorded At :")}</strong> {recorded_at}</p>
        <p className="label"><strong>{t("Current Value :")}</strong> {current_value} {unit_of_measure}</p>
        <p className="label"><strong>{t("Progress :")}</strong> {progress}</p>
      </div>
    );
  }

  return null;
};
export default CustomTooltipGoal;