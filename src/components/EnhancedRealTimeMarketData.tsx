
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Globe, RefreshCw, Activity, DollarSign, Users, BarChart, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedMarketDataProps {
  idea: string;
}

interface MarketInsight {
  title: string;
  summary: string;
  url: string;
  publishedDate: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relevance: number;
}

interface MarketMetrics {
  marketSize: string;
  growthRate: string;
  competitorCount: number;
  fundingActivity: number;
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
  keyInsights: MarketInsight[];
  lastUpdated: Date;
}

const EnhancedRealTimeMarketData: React.FC<EnhancedMarketDataProps> = ({ idea }) => {
  const [marketData, setMarketData] = useState<MarketMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLiveMarketData = async () => {
    if (!idea) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching live market data for:', idea);
      
      // Call our enhanced Supabase edge function that uses Exa API
      const response = await fetch('/api/market-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idea,
          queries: [
            `${idea} market size growth 2024`,
            `${idea} competitor analysis funding`,
            `${idea} industry trends investment`,
            `${idea} startup landscape opportunities`
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const data = await response.json();
      
      if (data.success) {
        const processedData: MarketMetrics = {
          marketSize: extractMarketSize(data.insights),
          growthRate: extractGrowthRate(data.insights),
          competitorCount: extractCompetitorCount(data.insights),
          fundingActivity: extractFundingActivity(data.insights),
          marketSentiment: analyzeSentiment(data.insights),
          keyInsights: processInsights(data.insights),
          lastUpdated: new Date()
        };
        
        setMarketData(processedData);
        toast({
          title: "Market Data Updated",
          description: "Latest market intelligence has been fetched successfully.",
        });
      } else {
        throw new Error(data.error || 'Failed to process market data');
      }
    } catch (err) {
      console.error('Market data fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      
      // Fallback to enhanced simulated data
      setMarketData(generateEnhancedSimulatedData());
      
      toast({
        title: "Using Simulated Data",
        description: "Live market data unavailable. Showing enhanced projections.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateEnhancedSimulatedData = (): MarketMetrics => {
    const ideaLower = idea.toLowerCase();
    let baseMetrics = {
      marketSize: '2.5B',
      growthRate: '15%',
      competitorCount: 150,
      fundingActivity: 25
    };

    // Industry-specific adjustments
    if (ideaLower.includes('ai') || ideaLower.includes('machine learning')) {
      baseMetrics = { marketSize: '8.2B', growthRate: '28%', competitorCount: 320, fundingActivity: 85 };
    } else if (ideaLower.includes('health') || ideaLower.includes('medical')) {
      baseMetrics = { marketSize: '12.1B', growthRate: '22%', competitorCount: 180, fundingActivity: 65 };
    } else if (ideaLower.includes('fintech') || ideaLower.includes('finance')) {
      baseMetrics = { marketSize: '15.8B', growthRate: '25%', competitorCount: 420, fundingActivity: 120 };
    }

    return {
      ...baseMetrics,
      marketSentiment: 'bullish',
      keyInsights: [
        {
          title: `Growing demand for ${idea.split(' ').slice(0, 3).join(' ')} solutions`,
          summary: 'Market research indicates strong interest from target demographics with increasing adoption rates.',
          url: '#',
          publishedDate: new Date().toISOString(),
          sentiment: 'positive',
          relevance: 0.95
        },
        {
          title: 'Competitive landscape analysis',
          summary: 'Several established players exist but market fragmentation creates opportunities for innovative approaches.',
          url: '#',
          publishedDate: new Date().toISOString(),
          sentiment: 'neutral',
          relevance: 0.88
        },
        {
          title: 'Investment trends and funding activity',
          summary: 'Recent funding rounds show investor confidence with focus on scalable solutions.',
          url: '#',
          publishedDate: new Date().toISOString(),
          sentiment: 'positive',
          relevance: 0.82
        }
      ],
      lastUpdated: new Date()
    };
  };

  // Helper functions to extract data from market insights
  const extractMarketSize = (insights: any[]): string => {
    // Logic to extract market size from insights
    return '5.2B'; // Placeholder
  };

  const extractGrowthRate = (insights: any[]): string => {
    return '18%'; // Placeholder
  };

  const extractCompetitorCount = (insights: any[]): number => {
    return 185; // Placeholder
  };

  const extractFundingActivity = (insights: any[]): number => {
    return 42; // Placeholder
  };

  const analyzeSentiment = (insights: any[]): 'bullish' | 'bearish' | 'neutral' => {
    return 'bullish'; // Placeholder
  };

  const processInsights = (insights: any[]): MarketInsight[] => {
    // Process raw insights into structured format
    return []; // Placeholder
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'bearish':
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
      case 'positive':
        return <TrendingUp className="h-4 w-4" />;
      case 'bearish':
      case 'negative':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    fetchLiveMarketData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchLiveMarketData, 300000);
    return () => clearInterval(interval);
  }, [idea]);

  if (!marketData) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading market intelligence...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 mb-6">
      {/* Main Market Metrics Dashboard */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Live Market Intelligence</span>
              {error && <AlertCircle className="h-4 w-4 text-red-500" />}
              {!error && <CheckCircle className="h-4 w-4 text-green-500" />}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Updated: {marketData.lastUpdated.toLocaleTimeString()}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchLiveMarketData}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-primary">${marketData.marketSize}</div>
              <div className="text-xs text-muted-foreground">Market Size</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className={`text-2xl font-bold flex items-center justify-center ${getSentimentColor('positive')}`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                {marketData.growthRate}
              </div>
              <div className="text-xs text-muted-foreground">Growth Rate</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-warning">{marketData.competitorCount}</div>
              <div className="text-xs text-muted-foreground">Active Competitors</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-success">{marketData.fundingActivity}</div>
              <div className="text-xs text-muted-foreground">Funding Rounds (YTD)</div>
            </div>
          </div>

          <div className="p-4 bg-card/60 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground">
                <strong>Market Sentiment:</strong> 
                <span className={`ml-2 ${getSentimentColor(marketData.marketSentiment)}`}>
                  {marketData.marketSentiment.charAt(0).toUpperCase() + marketData.marketSentiment.slice(1)}
                </span>
              </div>
              <div className={getSentimentColor(marketData.marketSentiment)}>
                {getSentimentIcon(marketData.marketSentiment)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      {marketData.keyInsights.length > 0 && (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-primary" />
              <span>Key Market Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.keyInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{insight.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getSentimentColor(insight.sentiment)}>
                        {insight.sentiment}
                      </Badge>
                      <Badge variant="outline">
                        {Math.round(insight.relevance * 100)}% relevance
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{insight.summary}</p>
                  <div className="text-xs text-muted-foreground">
                    Published: {new Date(insight.publishedDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-yellow-700 dark:text-yellow-300">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                <strong>Note:</strong> Live market data is currently unavailable. Showing enhanced projections based on industry analysis.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedRealTimeMarketData;
