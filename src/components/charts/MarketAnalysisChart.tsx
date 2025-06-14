
import React from 'react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Bar, Line } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface MarketData {
  year: string;
  marketSize: number;
  growth: number;
  competitors: number;
  funding: number;
}

interface MarketAnalysisChartProps {
  marketData: MarketData[];
  colors: any;
}

const MarketAnalysisChart: React.FC<MarketAnalysisChartProps> = ({ marketData, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={marketData}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.muted} opacity={0.3} />
        <XAxis dataKey="year" stroke={colors.foreground} />
        <YAxis yAxisId="left" stroke={colors.foreground} />
        <YAxis yAxisId="right" orientation="right" stroke={colors.foreground} />
        <Tooltip content={<CustomTooltip />} />
        <Area yAxisId="left" type="monotone" dataKey="marketSize" stroke={colors.primary} fill={colors.primary} fillOpacity={0.3} />
        <Bar yAxisId="right" dataKey="competitors" fill={colors.warning} opacity={0.8} />
        <Line yAxisId="left" type="monotone" dataKey="funding" stroke={colors.success} strokeWidth={3} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MarketAnalysisChart;
