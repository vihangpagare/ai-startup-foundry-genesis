
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Users, Target, Download, ZoomIn, BarChart3, Activity, Fuel } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

import MetricsOverview from './charts/MetricsOverview';
import MarketAnalysisChart from './charts/MarketAnalysisChart';
import RevenueProjectionsChart from './charts/RevenueProjectionsChart';
import SalesFunnelChart from './charts/SalesFunnelChart';
import CompetitiveLandscapeChart from './charts/CompetitiveLandscapeChart';

import {
  generateEnhancedMarketData,
  generateDetailedRevenueData,
  generateFunnelData,
  generateCompetitiveData,
  generateStartupMetrics
} from '@/utils/chartDataGenerators';

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

  const marketData = generateEnhancedMarketData(ideaData);
  const revenueData = generateDetailedRevenueData();
  const funnelData = generateFunnelData(colors);
  const competitorData = generateCompetitiveData(colors);
  const startupMetrics = generateStartupMetrics(ideaData, colors);

  const exportChart = (chartType: string) => {
    console.log(`Exporting ${chartType} chart...`);
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <Card className="card-vibrant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span>Startup Analytics Dashboard</span>
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
                  <span className="hidden sm:inline">Analytics</span>
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

              <TabsContent value="overview" className="space-y-6">
                <ErrorBoundary>
                  <MetricsOverview metricsData={startupMetrics} colors={colors} />
                </ErrorBoundary>
              </TabsContent>

              <TabsContent value="market">
                <ErrorBoundary>
                  <MarketAnalysisChart marketData={marketData} colors={colors} />
                </ErrorBoundary>
              </TabsContent>

              <TabsContent value="revenue">
                <ErrorBoundary>
                  <RevenueProjectionsChart revenueData={revenueData} colors={colors} />
                </ErrorBoundary>
              </TabsContent>

              <TabsContent value="funnel">
                <ErrorBoundary>
                  <SalesFunnelChart funnelData={funnelData} colors={colors} />
                </ErrorBoundary>
              </TabsContent>

              <TabsContent value="competitive">
                <ErrorBoundary>
                  <CompetitiveLandscapeChart competitorData={competitorData} />
                </ErrorBoundary>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default EnhancedDataVisualization;
