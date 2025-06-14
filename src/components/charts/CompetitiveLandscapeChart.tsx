
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface CompetitorData {
  name: string;
  share: number;
  funding: number;
  employees: number;
  color: string;
}

interface CompetitiveLandscapeChartProps {
  competitorData: CompetitorData[];
}

const CompetitiveLandscapeChart: React.FC<CompetitiveLandscapeChartProps> = ({ competitorData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={competitorData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="share"
          label={({ name, share }) => `${name}: ${share}%`}
        >
          {competitorData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CompetitiveLandscapeChart;
