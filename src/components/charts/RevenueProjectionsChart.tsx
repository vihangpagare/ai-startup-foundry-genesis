
import React from 'react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Bar, Line } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface RevenueData {
  month: string;
  revenue: number;
  users: number;
  churn: number;
  mrr: number;
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
        <XAxis dataKey="month" stroke={colors.foreground} />
        <YAxis yAxisId="left" stroke={colors.foreground} />
        <YAxis yAxisId="right" orientation="right" stroke={colors.foreground} />
        <Tooltip content={<CustomTooltip />} />
        <Area yAxisId="left" type="monotone" dataKey="revenue" stroke={colors.primary} fill={colors.primary} fillOpacity={0.3} />
        <Bar yAxisId="right" dataKey="users" fill={colors.secondary} opacity={0.8} />
        <Line yAxisId="left" type="monotone" dataKey="mrr" stroke={colors.success} strokeWidth={3} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RevenueProjectionsChart;
