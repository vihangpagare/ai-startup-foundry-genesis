
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';

interface DataVisualizationProps {
  ideaData: any;
  reports: Record<string, string>;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ ideaData, reports }) => {
  // Generate dynamic data based on the idea
  const generateMarketData = () => {
    const idea = ideaData?.idea?.toLowerCase() || '';
    let baseGrowth = 15;
    
    if (idea.includes('ai') || idea.includes('machine learning')) baseGrowth = 25;
    if (idea.includes('health') || idea.includes('medical')) baseGrowth = 18;
    if (idea.includes('fintech') || idea.includes('finance')) baseGrowth = 22;
    if (idea.includes('education') || idea.includes('learning')) baseGrowth = 16;
    
    return [
      { year: '2024', marketSize: 1.2, growth: baseGrowth },
      { year: '2025', marketSize: 1.2 * (1 + baseGrowth/100), growth: baseGrowth + 2 },
      { year: '2026', marketSize: 1.2 * Math.pow(1 + baseGrowth/100, 2), growth: baseGrowth + 1 },
      { year: '2027', marketSize: 1.2 * Math.pow(1 + baseGrowth/100, 3), growth: baseGrowth - 1 },
    ];
  };

  const generateRevenueProjections = () => {
    const baseRevenue = 50000;
    return [
      { month: 'Q1', revenue: baseRevenue, users: 100 },
      { month: 'Q2', revenue: baseRevenue * 1.8, users: 250 },
      { month: 'Q3', revenue: baseRevenue * 3.2, users: 500 },
      { month: 'Q4', revenue: baseRevenue * 5.1, users: 850 },
      { month: 'Y2 Q1', revenue: baseRevenue * 7.8, users: 1200 },
      { month: 'Y2 Q2', revenue: baseRevenue * 11.2, users: 1800 },
    ];
  };

  const generateCompetitorData = () => [
    { name: 'Market Leader', share: 35, color: '#8884d8' },
    { name: 'Second Player', share: 25, color: '#82ca9d' },
    { name: 'Third Player', share: 18, color: '#ffc658' },
    { name: 'Others', share: 15, color: '#ff7c7c' },
    { name: 'Your Opportunity', share: 7, color: '#8dd1e1' },
  ];

  const marketData = generateMarketData();
  const revenueData = generateRevenueProjections();
  const competitorData = generateCompetitorData();

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Market Size Growth */}
      <Card className="card-vibrant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Market Size Projections</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="year" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(1)}B`, 'Market Size']}
                labelFormatter={(label) => `Year: ${label}`}
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="marketSize" 
                stroke="#667eea" 
                fill="url(#colorGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitive Landscape */}
      <Card className="card-vibrant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span>Market Share Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={competitorData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="share"
                label={({ name, share }) => `${name}: ${share}%`}
                labelLine={false}
              >
                {competitorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Market Share']}
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Projections */}
      <Card className="card-vibrant lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Revenue & User Growth Projections</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis yAxisId="left" className="text-xs" />
              <YAxis yAxisId="right" orientation="right" className="text-xs" />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : `${value.toLocaleString()} users`,
                  name === 'revenue' ? 'Revenue' : 'Users'
                ]}
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="users" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
