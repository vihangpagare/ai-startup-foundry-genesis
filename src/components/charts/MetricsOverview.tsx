
import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip, Legend } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CustomTooltip from './CustomTooltip';

interface MetricsData {
  metric: string;
  score: number;
  category: string;
  color: string;
}

interface MetricsOverviewProps {
  metricsData: MetricsData[];
  colors: any;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metricsData, colors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <Card key={index} className="text-center p-4">
            <div className="text-2xl font-bold mb-1" style={{ color: metric.color }}>
              {metric.score}%
            </div>
            <div className="text-sm text-muted-foreground">{metric.metric}</div>
            <Badge variant="outline" className="mt-2 text-xs">
              {metric.category}
            </Badge>
          </Card>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart data={metricsData}>
          <RadialBar dataKey="score" cornerRadius={10} fill={colors.primary} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsOverview;
