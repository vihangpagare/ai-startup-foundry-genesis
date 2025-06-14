
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

export const generateMetricsData = (colors: any) => [
  {
    title: 'Monthly Revenue',
    value: '$45,230',
    change: '+12.5%',
    trend: 'up' as const,
    color: colors.success,
    data: [20, 25, 30, 28, 35, 40, 45]
  },
  {
    title: 'Active Users',
    value: '2,847',
    change: '+8.2%',
    trend: 'up' as const,
    color: colors.primary,
    data: [100, 120, 140, 160, 180, 200, 220]
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-0.5%',
    trend: 'down' as const,
    color: colors.warning,
    data: [3.8, 3.6, 3.4, 3.2, 3.1, 3.0, 3.2]
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8/5',
    change: '+0.3',
    trend: 'up' as const,
    color: colors.success,
    data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8]
  }
];
