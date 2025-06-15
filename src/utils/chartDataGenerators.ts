export const generateEnhancedMarketData = (ideaData: any) => {
  const currentYear = new Date().getFullYear();
  return [
    { year: `${currentYear - 2}`, marketSize: 45000, growth: 12, competitors: 25, funding: 2500 },
    { year: `${currentYear - 1}`, marketSize: 52000, growth: 15, competitors: 32, funding: 3200 },
    { year: `${currentYear}`, marketSize: 61000, growth: 18, competitors: 38, funding: 4100 },
    { year: `${currentYear + 1}`, marketSize: 73000, growth: 22, competitors: 45, funding: 5800 },
    { year: `${currentYear + 2}`, marketSize: 89000, growth: 25, competitors: 52, funding: 7200 }
  ];
};

export const generateDetailedRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 10000 + (index * 2000),
    users: Math.floor(Math.random() * 1000) + 200 + (index * 50),
    churn: Math.random() * 5 + 2,
    mrr: Math.floor(Math.random() * 15000) + 5000 + (index * 800)
  }));
};

export const generateFunnelData = (colors: any) => [
  { name: 'Website Visitors', value: 10000, fill: colors.primary },
  { name: 'Sign-ups', value: 3000, fill: colors.secondary },
  { name: 'Trial Users', value: 1500, fill: colors.success },
  { name: 'Paid Users', value: 500, fill: colors.warning },
  { name: 'Long-term Customers', value: 200, fill: colors.danger }
];

export const generateCompetitiveData = (colors: any) => [
  { name: 'Your Company', share: 25, funding: 5000000, employees: 50, color: colors.primary },
  { name: 'Competitor A', share: 35, funding: 15000000, employees: 150, color: colors.secondary },
  { name: 'Competitor B', share: 20, funding: 8000000, employees: 80, color: colors.success },
  { name: 'Competitor C', share: 15, funding: 12000000, employees: 120, color: colors.warning },
  { name: 'Others', share: 5, funding: 2000000, employees: 30, color: colors.muted }
];

// New startup-focused metrics generator
export const generateStartupMetrics = (ideaData: any, colors: any) => {
  // Generate metrics based on idea context
  const getMarketOpportunityScore = () => {
    const factors = [
      ideaData?.targetAudience?.length || 50,
      ideaData?.problemStatement?.length || 50,
      ideaData?.uniqueValue?.length || 50
    ];
    const avgFactor = factors.reduce((a, b) => a + b, 0) / factors.length;
    return Math.min(Math.floor((avgFactor / 30) * 85 + 15), 95);
  };

  const getCompetitiveAdvantageIndex = () => {
    const uniqueValueScore = (ideaData?.uniqueValue?.length || 30) / 30;
    return Math.min(Math.floor(uniqueValueScore * 80 + 20), 92);
  };

  const getFeasibilityRating = () => {
    const solutionComplexity = (ideaData?.solution?.split(' ').length || 10) / 10;
    return Math.min(Math.floor((1 / solutionComplexity) * 70 + 25), 88);
  };

  const getGrowthPotential = () => {
    const marketWords = ['global', 'enterprise', 'scale', 'automation', 'AI', 'platform'];
    const hasGrowthWords = marketWords.some(word => 
      ideaData?.idea?.toLowerCase().includes(word) || 
      ideaData?.solution?.toLowerCase().includes(word)
    );
    return hasGrowthWords ? Math.floor(Math.random() * 15 + 80) : Math.floor(Math.random() * 20 + 65);
  };

  return [
    {
      title: 'Market Opportunity',
      value: `${getMarketOpportunityScore()}/100`,
      change: '+5 pts this quarter',
      trend: 'up' as const,
      color: colors.success,
      data: [70, 75, 78, 82, 85, 88, getMarketOpportunityScore()]
    },
    {
      title: 'Competitive Advantage',
      value: `${getCompetitiveAdvantageIndex()}/100`,
      change: '+3 pts this month',
      trend: 'up' as const,
      color: colors.primary,
      data: [60, 65, 70, 72, 75, 78, getCompetitiveAdvantageIndex()]
    },
    {
      title: 'Feasibility Score',
      value: `${getFeasibilityRating()}/100`,
      change: '+2 pts recent',
      trend: 'up' as const,
      color: colors.warning,
      data: [70, 72, 74, 76, 78, 82, getFeasibilityRating()]
    },
    {
      title: 'Growth Potential',
      value: `${getGrowthPotential()}/100`,
      change: '+7 pts projected',
      trend: 'up' as const,
      color: colors.success,
      data: [65, 68, 72, 75, 78, 82, getGrowthPotential()]
    }
  ];
};

// Keep existing function for backward compatibility but rename the export
export const generateMetricsData = generateStartupMetrics;
