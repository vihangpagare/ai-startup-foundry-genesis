
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Globe, RefreshCw } from 'lucide-react';

interface MarketDataProps {
  idea: string;
}

const RealTimeMarketData: React.FC<MarketDataProps> = ({ idea }) => {
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const generateLiveMarketData = () => {
    // Simulate real-time market data based on the idea
    const sectors = ['SaaS', 'FinTech', 'HealthTech', 'EdTech', 'E-commerce'];
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    
    return {
      sector: randomSector,
      marketCap: (Math.random() * 500 + 100).toFixed(1),
      dailyChange: (Math.random() * 10 - 5).toFixed(2),
      weeklyTrend: Math.random() > 0.5 ? 'up' : 'down',
      investmentActivity: Math.floor(Math.random() * 50 + 10),
      competitorCount: Math.floor(Math.random() * 500 + 100),
      averageValuation: (Math.random() * 100 + 10).toFixed(1),
      fundingRounds: Math.floor(Math.random() * 20 + 5)
    };
  };

  const refreshData = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setMarketData(generateLiveMarketData());
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    refreshData();
    // Auto-refresh every 2 minutes
    const interval = setInterval(refreshData, 120000);
    return () => clearInterval(interval);
  }, [idea]);

  if (!marketData) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <span>Live Market Intelligence</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              Updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <button
              onClick={refreshData}
              disabled={loading}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition-colors"
            >
              <RefreshCw className={`h-4 w-4 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">${marketData.marketCap}B</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Market Size</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold flex items-center justify-center ${
              parseFloat(marketData.dailyChange) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {parseFloat(marketData.dailyChange) >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {marketData.dailyChange}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Daily Change</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{marketData.investmentActivity}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Active Deals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${marketData.averageValuation}M</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">Avg Valuation</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <strong>{marketData.sector} Sector:</strong> {marketData.competitorCount} active companies, 
            {marketData.fundingRounds} funding rounds this month. 
            Weekly trend: <span className={marketData.weeklyTrend === 'up' ? 'text-green-600' : 'text-red-600'}>
              {marketData.weeklyTrend}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeMarketData;
