
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, Users, Target, BarChart3, PieChart } from 'lucide-react';

interface FinancialProjectionsProps {
  idea: string;
  ideaData: any;
}

const FinancialProjections: React.FC<FinancialProjectionsProps> = ({ idea, ideaData }) => {
  // Generate financial data based on the idea
  const generateFinancialData = () => {
    const isB2B = idea.toLowerCase().includes('business') || idea.toLowerCase().includes('enterprise') || idea.toLowerCase().includes('company');
    const isHighValue = idea.toLowerCase().includes('analytics') || idea.toLowerCase().includes('ai') || idea.toLowerCase().includes('automation');
    
    const basePrice = isB2B ? (isHighValue ? 99 : 49) : (isHighValue ? 29 : 19);
    const growthRate = isB2B ? 15 : 20;
    
    return {
      monthlyPrice: basePrice,
      year1Revenue: basePrice * 12 * 250,
      year2Revenue: basePrice * 12 * 750,
      year3Revenue: basePrice * 12 * 1500,
      growthRate,
      customerAcquisitionCost: Math.round(basePrice * 0.3),
      lifetimeValue: Math.round(basePrice * 24),
      churnRate: isB2B ? 5 : 8,
      grossMargin: isB2B ? 85 : 80
    };
  };

  const financialData = generateFinancialData();

  const revenueProjections = [
    { year: 'Year 1', revenue: financialData.year1Revenue, customers: 250, arr: financialData.year1Revenue },
    { year: 'Year 2', revenue: financialData.year2Revenue, customers: 750, arr: financialData.year2Revenue },
    { year: 'Year 3', revenue: financialData.year3Revenue, customers: 1500, arr: financialData.year3Revenue }
  ];

  const costBreakdown = [
    { category: 'Development & Engineering', percentage: 35, amount: Math.round(financialData.year1Revenue * 0.35) },
    { category: 'Sales & Marketing', percentage: 25, amount: Math.round(financialData.year1Revenue * 0.25) },
    { category: 'Infrastructure & Hosting', percentage: 15, amount: Math.round(financialData.year1Revenue * 0.15) },
    { category: 'Operations & Support', percentage: 15, amount: Math.round(financialData.year1Revenue * 0.15) },
    { category: 'Legal & Compliance', percentage: 10, amount: Math.round(financialData.year1Revenue * 0.10) }
  ];

  const keyMetrics = [
    { metric: 'Monthly Recurring Revenue (MRR)', value: `$${Math.round(financialData.year1Revenue / 12).toLocaleString()}`, growth: '+25% MoM' },
    { metric: 'Customer Acquisition Cost (CAC)', value: `$${financialData.customerAcquisitionCost}`, growth: '-15% YoY' },
    { metric: 'Customer Lifetime Value (LTV)', value: `$${financialData.lifetimeValue}`, growth: '+30% YoY' },
    { metric: 'LTV:CAC Ratio', value: `${Math.round(financialData.lifetimeValue / financialData.customerAcquisitionCost)}:1`, growth: 'Healthy' },
    { metric: 'Monthly Churn Rate', value: `${financialData.churnRate}%`, growth: '-2% MoM' },
    { metric: 'Gross Margin', value: `${financialData.grossMargin}%`, growth: 'Stable' }
  ];

  return (
    <div className="space-y-8">
      {/* Executive Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span>Financial Executive Summary</span>
          </CardTitle>
          <CardDescription>
            3-Year revenue projections and key financial metrics for your SaaS startup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">${financialData.year3Revenue.toLocaleString()}</div>
              <div className="text-sm text-green-600">Year 3 ARR Target</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{financialData.growthRate}%</div>
              <div className="text-sm text-blue-600">Monthly Growth Rate</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">{Math.round(financialData.lifetimeValue / financialData.customerAcquisitionCost)}:1</div>
              <div className="text-sm text-purple-600">LTV:CAC Ratio</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">{financialData.grossMargin}%</div>
              <div className="text-sm text-orange-600">Gross Margin</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <span>3-Year Revenue Projections</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {revenueProjections.map((projection, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{projection.year}</span>
                  <span className="text-lg font-bold text-green-600">
                    ${projection.revenue.toLocaleString()} ARR
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>Revenue: ${projection.revenue.toLocaleString()}</div>
                  <div>Customers: {projection.customers.toLocaleString()}</div>
                  <div>ARPU: ${Math.round(projection.revenue / projection.customers)}</div>
                </div>
                <Progress value={(index + 1) * 33} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-purple-600" />
            <span>Cost Structure & Resource Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costBreakdown.map((cost, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{cost.category}</span>
                  <span className="font-semibold">${cost.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={cost.percentage} className="flex-1 h-2" />
                  <span className="text-sm text-gray-600 w-12">{cost.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key SaaS Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span>Key SaaS Metrics & KPIs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                    <div className="text-2xl font-bold text-indigo-600 mt-1">{metric.value}</div>
                  </div>
                  <div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                    {metric.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Funding & Investment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Funding Requirements & Investment Strategy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-gray-700">$50K - $100K</div>
                <div className="text-sm text-gray-600">Pre-Seed / Bootstrap</div>
                <div className="text-xs text-gray-500 mt-1">MVP Development</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-700">$250K - $500K</div>
                <div className="text-sm text-blue-600">Seed Round</div>
                <div className="text-xs text-blue-500 mt-1">Market Validation</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-700">$1M - $3M</div>
                <div className="text-sm text-purple-600">Series A</div>
                <div className="text-xs text-purple-500 mt-1">Scale & Growth</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Investment Use of Funds</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Product Development (40%)</span>
                  <div className="text-gray-600">Engineering team, feature development, infrastructure</div>
                </div>
                <div>
                  <span className="font-medium">Sales & Marketing (35%)</span>
                  <div className="text-gray-600">Customer acquisition, brand building, content marketing</div>
                </div>
                <div>
                  <span className="font-medium">Operations (15%)</span>
                  <div className="text-gray-600">Team expansion, legal, accounting, workspace</div>
                </div>
                <div>
                  <span className="font-medium">Reserve Fund (10%)</span>
                  <div className="text-gray-600">Runway extension, unexpected opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Break-even Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Break-even Analysis & Milestones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Revenue Milestones</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>$10K MRR (Product-Market Fit)</span>
                    <span className="font-medium">Month 8-12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$25K MRR (Scale Ready)</span>
                    <span className="font-medium">Month 15-18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$100K MRR (Series A Ready)</span>
                    <span className="font-medium">Month 24-30</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Break-even Scenarios</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Conservative (150 customers)</span>
                    <span className="font-medium">Month 12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Realistic (200 customers)</span>
                    <span className="font-medium">Month 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Optimistic (250 customers)</span>
                    <span className="font-medium">Month 8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialProjections;
