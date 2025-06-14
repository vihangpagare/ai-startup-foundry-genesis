
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Star } from 'lucide-react';

interface MetricData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  data: number[];
}

interface MetricsOverviewProps {
  metricsData: MetricData[];
  colors: any;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metricsData, colors }) => {
  const getIcon = (title: string) => {
    if (title.includes('Revenue')) return <DollarSign className="h-5 w-5" />;
    if (title.includes('Users')) return <Users className="h-5 w-5" />;
    if (title.includes('Conversion')) return <Target className="h-5 w-5" />;
    if (title.includes('Satisfaction')) return <Star className="h-5 w-5" />;
    return <TrendingUp className="h-5 w-5" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <Card key={index} className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div style={{ color: metric.color }}>
              {getIcon(metric.title)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {metric.change}
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsOverview;
