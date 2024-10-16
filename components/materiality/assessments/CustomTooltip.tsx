import React from 'react';
import { TooltipProps } from 'recharts';

// Custom Tooltip component
const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { assessment_id, code, topic, sub_topic,is_material,impact_score,financial_score } = payload[0].payload;
    const materialStatus = is_material ? "True" : "False";

    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <p className="label"><strong>Assessment ID:</strong> {assessment_id}</p>
        <p className="label"><strong>Code:</strong> {code}</p>
        <p className="label"><strong>Topic:</strong> {topic}</p>
        <p className="label"><strong>Sub Topic:</strong> {sub_topic}</p>
        <p className="label"><strong>Is Material:</strong> {materialStatus}</p>
        <p className="label"><strong>Impact Score:</strong> {impact_score}</p>
        <p className="label"><strong>Financial Score:</strong> {financial_score}</p>
      </div>
    );
  }

  return null;
};
export default CustomTooltip;