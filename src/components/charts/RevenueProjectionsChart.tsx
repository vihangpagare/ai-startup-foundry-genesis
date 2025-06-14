
import React from 'react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface RevenueData {
  quarter: string;
  revenue: number;
  users: number;
  churn: number;
  cac: number;
  ltv: number;
}

interface RevenueProjectionsChartProps {
  revenueData: RevenueData[];
  colors: any;
}

const RevenueProjectionsChart: React.FC<RevenueProjectionsChartProps> = ({ revenueData, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.muted} opacity={0.3} />
        <XAxis dataKey="quarter" stroke={colors.foreground} />
        <YAxis yAxisId="left" stroke={colors.foreground} />
        <YAxis yAxisId="right" orientation="right" stroke={colors.foreground} />
        <Tooltip content={<CustomTooltip />} />
        <Area yAxisId="left" type="monotone" dataKey="revenue" stroke={colors.success} fill={colors.success} fillOpacity={0.3} />
        <Line yAxisId="right" type="monotone" dataKey="users" stroke={colors.primary} strokeWidth={3} />
        <Line yAxisId="right" type="monotone" dataKey="churn" stroke={colors.danger} strokeWidth={2} strokeDasharray="5 5" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RevenueProjectionsChart;
