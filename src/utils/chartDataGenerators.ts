
interface MarketData {
  year: string;
  marketSize: number;
  growth: number;
  competitors: number;
  funding: number;
}

interface RevenueData {
  quarter: string;
  revenue: number;
  users: number;
  churn: number;
  cac: number;
  ltv: number;
}

interface FunnelData {
  name: string;
  value: number;
  fill: string;
}

interface CompetitorData {
  name: string;
  share: number;
  funding: number;
  employees: number;
  color: string;
}

interface MetricsData {
  metric: string;
  score: number;
  category: string;
  color: string;
}

export const generateEnhancedMarketData = (ideaData: any): MarketData[] => {
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

export const generateDetailedRevenueData = (): RevenueData[] => {
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

export const generateFunnelData = (colors: any): FunnelData[] => [
  { name: 'Website Visitors', value: 10000, fill: colors.primary },
  { name: 'Signups', value: 2500, fill: colors.secondary },
  { name: 'Free Trial', value: 1200, fill: colors.success },
  { name: 'Paid Conversion', value: 360, fill: colors.warning },
  { name: 'Retained Users', value: 320, fill: colors.danger }
];

export const generateCompetitiveData = (colors: any): CompetitorData[] => [
  { name: 'Market Leader', share: 32, funding: 150, employees: 500, color: colors.danger },
  { name: 'Strong Competitor', share: 24, funding: 80, employees: 200, color: colors.warning },
  { name: 'Emerging Player', share: 18, funding: 45, employees: 120, color: colors.secondary },
  { name: 'Niche Players', share: 16, funding: 25, employees: 80, color: colors.muted },
  { name: 'Your Opportunity', share: 10, funding: 0, employees: 0, color: colors.success }
];

export const generateMetricsData = (colors: any): MetricsData[] => [
  { metric: 'Market Viability', score: 85, category: 'High', color: colors.success },
  { metric: 'Technical Feasibility', score: 92, category: 'Very High', color: colors.primary },
  { metric: 'Competition Level', score: 65, category: 'Moderate', color: colors.warning },
  { metric: 'Investment Appeal', score: 78, category: 'Strong', color: colors.secondary }
];
