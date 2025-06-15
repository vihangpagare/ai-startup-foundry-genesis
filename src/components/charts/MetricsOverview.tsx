
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, Star, Lightbulb, BarChart3 } from 'lucide-react';

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
    if (title.includes('Market Opportunity')) return <Target className="h-5 w-5" />;
    if (title.includes('Competitive')) return <BarChart3 className="h-5 w-5" />;
    if (title.includes('Feasibility')) return <Lightbulb className="h-5 w-5" />;
    if (title.includes('Growth')) return <Star className="h-5 w-5" />;
    return <TrendingUp className="h-5 w-5" />;
  };

  const getDescription = (title: string) => {
    if (title.includes('Market Opportunity')) return 'Market size and addressability';
    if (title.includes('Competitive')) return 'Uniqueness and differentiation';
    if (title.includes('Feasibility')) return 'Technical and business viability';
    if (title.includes('Growth')) return 'Scalability and expansion potential';
    return 'Performance metric';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div style={{ color: metric.color }}>
              {getIcon(metric.title)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className="text-xs text-muted-foreground mb-2">
              {getDescription(metric.title)}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {metric.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsOverview;
