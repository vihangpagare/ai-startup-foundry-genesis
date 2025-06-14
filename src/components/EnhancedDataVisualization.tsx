import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, FunnelChart, Funnel, 
  LabelList, RadialBarChart, RadialBar, Legend, ComposedChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Target, Download, ZoomIn, BarChart3, PieChart as PieChartIcon, Activity, Fuel } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface EnhancedDataVisualizationProps {
  ideaData: any;
  reports: Record<string, string>;
}

const EnhancedDataVisualization: React.FC<EnhancedDataVisualizationProps> = ({ ideaData, reports }) => {
  const { resolvedTheme } = useTheme();
  const [activeChart, setActiveChart] = useState<string>('overview');
  const [zoomLevel, setZoomLevel] = useState(1);

  const isDark = resolvedTheme === 'dark';
  
  // Theme-aware colors
  const colors = {
    primary: isDark ? '#8b5cf6' : '#7c3aed',
    secondary: isDark ? '#06b6d4' : '#0891b2', 
    success: isDark ? '#10b981' : '#059669',
    warning: isDark ? '#f59e0b' : '#d97706',
    danger: isDark ? '#ef4444' : '#dc2626',
    muted: isDark ? '#6b7280' : '#9ca3af',
    background: isDark ? '#1f2937' : '#ffffff',
    foreground: isDark ? '#f9fafb' : '#111827'
  };

  // Generate enhanced market data with industry-specific insights
  const generateEnhancedMarketData = () => {
    const idea = ideaData?.idea?.toLowerCase() || '';
    let baseGrowth = 15;
    let marketMultiplier = 1;
    
    if (idea.includes('ai') || idea.includes('machine learning')) {
      baseGrowth = 28;
      marketMultiplier = 2.5;
    } else if (idea.includes('health') || idea.includes('medical')) {
      baseGrowth = 22;
      marketMultiplier = 1.8;
    } else if (idea.includes('fintech') || idea.includes('finance')) {
      baseGrowth = 25;
      marketMultiplier = 2.2;
    } else if (idea.includes('education') || idea.includes('learning')) {
      baseGrowth = 18;
      marketMultiplier = 1.4;
    }
    
    return [
      { year: '2023', marketSize: 1.2 * marketMultiplier, growth: baseGrowth - 3, competitors: 150, funding: 2.1 },
      { year: '2024', marketSize: 1.2 * marketMultiplier * (1 + baseGrowth/100), growth: baseGrowth, competitors: 185, funding: 3.2 },
      { year: '2025', marketSize: 1.2 * marketMultiplier * Math.pow(1 + baseGrowth/100, 2), growth: baseGrowth + 2, competitors: 220, funding: 4.8 },
      { year: '2026', marketSize: 1.2 * marketMultiplier * Math.pow(1 + baseGrowth/100, 3), growth: baseGrowth + 1, competitors: 260, funding: 6.5 },
      { year: '2027', marketSize: 1.2 * marketMultiplier * Math.pow(1 + baseGrowth/100, 4), growth: baseGrowth - 1, competitors: 295, funding: 8.2 },
    ];
  };

  // Enhanced revenue projections with detailed breakdown
  const generateDetailedRevenueData = () => {
    const baseRevenue = 50000;
    return [
      { quarter: 'Q1 2024', revenue: baseRevenue, users: 100, churn: 5, cac: 150, ltv: 2400 },
      { quarter: 'Q2 2024', revenue: baseRevenue * 1.8, users: 250, churn: 4.2, cac: 140, ltv: 2650 },
      { quarter: 'Q3 2024', revenue: baseRevenue * 3.2, users: 500, churn: 3.8, cac: 130, ltv: 2900 },
      { quarter: 'Q4 2024', revenue: baseRevenue * 5.1, users: 850, churn: 3.5, cac: 125, ltv: 3200 },
      { quarter: 'Q1 2025', revenue: baseRevenue * 7.8, users: 1200, churn: 3.2, cac: 120, ltv: 3500 },
      { quarter: 'Q2 2025', revenue: baseRevenue * 11.2, users: 1800, churn: 3.0, cac: 115, ltv: 3800 },
    ];
  };

  // Sales funnel data
  const generateFunnelData = () => [
    { name: 'Website Visitors', value: 10000, fill: colors.primary },
    { name: 'Signups', value: 2500, fill: colors.secondary },
    { name: 'Free Trial', value: 1200, fill: colors.success },
    { name: 'Paid Conversion', value: 360, fill: colors.warning },
    { name: 'Retained Users', value: 320, fill: colors.danger }
  ];

  // Competitive landscape with market positioning
  const generateCompetitiveData = () => [
    { name: 'Market Leader', share: 32, funding: 150, employees: 500, color: colors.danger },
    { name: 'Strong Competitor', share: 24, funding: 80, employees: 200, color: colors.warning },
    { name: 'Emerging Player', share: 18, funding: 45, employees: 120, color: colors.secondary },
    { name: 'Niche Players', share: 16, funding: 25, employees: 80, color: colors.muted },
    { name: 'Your Opportunity', share: 10, funding: 0, employees: 0, color: colors.success }
  ];

  // Key metrics dashboard data
  const generateMetricsData = () => [
    { metric: 'Market Viability', score: 85, category: 'High', color: colors.success },
    { metric: 'Technical Feasibility', score: 92, category: 'Very High', color: colors.primary },
    { metric: 'Competition Level', score: 65, category: 'Moderate', color: colors.warning },
    { metric: 'Investment Appeal', score: 78, category: 'Strong', color: colors.secondary }
  ];

  const marketData = generateEnhancedMarketData();
  const revenueData = generateDetailedRevenueData();
  const funnelData = generateFunnelData();
  const competitorData = generateCompetitiveData();
  const metricsData = generateMetricsData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const exportChart = (chartType: string) => {
    // Future implementation for chart export
    console.log(`Exporting ${chartType} chart...`);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Dashboard Header */}
      <Card className="card-vibrant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span>Advanced Market Analytics Dashboard</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}>
                <ZoomIn className="h-4 w-4 mr-1" />
                Zoom
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportChart(activeChart)}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeChart} onValueChange={setActiveChart}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Market</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Revenue</span>
              </TabsTrigger>
              <TabsTrigger value="funnel" className="flex items-center space-x-1">
                <Fuel className="h-4 w-4" />
                <span className="hidden sm:inline">Funnel</span>
              </TabsTrigger>
              <TabsTrigger value="competitive" className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Competition</span>
              </TabsTrigger>
            </TabsList>

            {/* Key Metrics Overview */}
            <TabsContent value="overview" className="space-y-6">
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
            </TabsContent>

            {/* Enhanced Market Analysis */}
            <TabsContent value="market">
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
            </TabsContent>

            {/* Detailed Revenue Projections */}
            <TabsContent value="revenue">
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
            </TabsContent>

            {/* Sales Funnel Analysis */}
            <TabsContent value="funnel">
              <ResponsiveContainer width="100%" height={400}>
                <FunnelChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Funnel dataKey="value" data={funnelData}>
                    <LabelList position="center" fill={colors.background} stroke="none" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </TabsContent>

            {/* Competitive Landscape */}
            <TabsContent value="competitive">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDataVisualization;
