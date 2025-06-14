
import React from 'react';
import { ResponsiveContainer, FunnelChart, Funnel, Tooltip, LabelList } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface FunnelData {
  name: string;
  value: number;
  fill: string;
}

interface SalesFunnelChartProps {
  funnelData: FunnelData[];
  colors: any;
}

const SalesFunnelChart: React.FC<SalesFunnelChartProps> = ({ funnelData, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <FunnelChart>
        <Tooltip content={<CustomTooltip />} />
        <Funnel dataKey="value" data={funnelData}>
          <LabelList position="center" fill={colors.background} stroke="none" />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
};

export default SalesFunnelChart;
