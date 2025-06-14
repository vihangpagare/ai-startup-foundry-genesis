
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, PieChart, BarChart3, Calculator } from 'lucide-react';

interface FinancialProjectionsProps {
  idea: string;
  ideaData?: any;
}

const FinancialProjections = ({ idea, ideaData }: FinancialProjectionsProps) => {
  const isRestaurantIdea = idea.toLowerCase().includes('restaurant');
  const isDesignIdea = idea.toLowerCase().includes('design');
  const isHRIdea = idea.toLowerCase().includes('hr') || idea.toLowerCase().includes('job');

  const getFinancialData = () => {
    if (isRestaurantIdea) {
      return {
        revenueModel: "Freemium SaaS with tiered subscriptions",
        pricing: {
          free: "$0/month - 5 posts, basic templates",
          basic: "$29/month - 50 posts, premium templates, basic analytics",
          pro: "$79/month - unlimited posts, AI optimization, advanced analytics",
          enterprise: "$199/month - multi-location, team management, white-label"
        },
        marketSize: "$15.2B restaurant tech market, $4.2B social media management",
        tam: "$15.2B",
        sam: "$4.2B", 
        som: "$850M"
      };
    } else if (isDesignIdea) {
      return {
        revenueModel: "Marketplace commission + subscription hybrid",
        pricing: {
          basic: "15% commission on sales",
          pro: "$49/month + 10% commission - advanced tools",
          enterprise: "$149/month + 5% commission - white-label, priority"
        },
        marketSize: "$8.4B design tools market, $2.1B template marketplace",
        tam: "$8.4B",
        sam: "$2.1B",
        som: "$420M"
      };
    } else {
      return {
        revenueModel: "Tiered SaaS subscriptions with usage-based pricing",
        pricing: {
          starter: "$19/month - 10 projects, basic features",
          professional: "$59/month - unlimited projects, advanced features",
          enterprise: "$149/month - team features, priority support, custom integrations"
        },
        marketSize: "$195B global SaaS market",
        tam: "$195B",
        sam: "$25B",
        som: "$2.5B"
      };
    }
  };

  const data = getFinancialData();

  // 3-Year Financial Projections
  const projections = {
    year1: {
      users: { free: 500, paid: 150 },
      revenue: 180000,
      costs: 125000,
      profit: 55000,
      growth: "0%"
    },
    year2: {
      users: { free: 2500, paid: 750 },
      revenue: 850000,
      costs: 520000,
      profit: 330000,
      growth: "372%"
    },
    year3: {
      users: { free: 8000, paid: 2200 },
      revenue: 2100000,
      costs: 1250000,
      profit: 850000,
      growth: "147%"
    }
  };

  const costBreakdown = {
    development: {
      year1: 45000,
      year2: 180000,
      year3: 350000,
      description: "Engineering, product development, technical infrastructure"
    },
    marketing: {
      year1: 35000,
      year2: 150000,
      year3: 400000,
      description: "Customer acquisition, content marketing, paid advertising"
    },
    operations: {
      year1: 25000,
      year2: 110000,
      year3: 250000,
      description: "Customer success, support, administrative costs"
    },
    infrastructure: {
      year1: 20000,
      year2: 80000,
      year3: 250000,
      description: "Hosting, APIs, third-party services, security"
    }
  };

  const fundingScenarios = [
    {
      type: "Bootstrapped",
      amount: "$0",
      equity: "100% founder ownership",
      timeline: "Slower growth, profitability focus",
      pros: ["Full control", "No dilution", "Sustainable growth"],
      cons: ["Limited resources", "Slower scaling", "Higher risk"]
    },
    {
      type: "Angel/Pre-Seed",
      amount: "$100K-500K",
      equity: "10-20% dilution",
      timeline: "12-18 months runway",
      pros: ["Faster growth", "Advisor network", "Validation"],
      cons: ["Equity dilution", "Investor pressure", "Due diligence time"]
    },
    {
      type: "Seed Round",
      amount: "$500K-2M",
      equity: "15-25% dilution", 
      timeline: "18-24 months runway",
      pros: ["Significant resources", "Professional investors", "Market expansion"],
      cons: ["Board obligations", "Higher expectations", "Complex terms"]
    }
  ];

  const keyMetrics = {
    cac: isRestaurantIdea ? 45 : isDesignIdea ? 35 : 65, // Customer Acquisition Cost
    ltv: isRestaurantIdea ? 1800 : isDesignIdea ? 950 : 2400, // Lifetime Value
    churn: isRestaurantIdea ? "5%" : isDesignIdea ? "8%" : "6%", // Monthly churn
    payback: isRestaurantIdea ? "2.5 months" : isDesignIdea ? "3.2 months" : "2.8 months"
  };

  return (
    <div className="space-y-6">
      {/* Revenue Model */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Revenue Model & Pricing Strategy</span>
          </CardTitle>
          <CardDescription>
            Comprehensive pricing structure and monetization approach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Business Model</h4>
            <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">{data.revenueModel}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Pricing Tiers</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(data.pricing).map(([tier, details], index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold capitalize text-lg mb-2">{tier}</h5>
                  <p className="text-sm text-gray-600">{details}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Market Opportunity</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{data.tam}</div>
                <div className="text-sm text-gray-600">TAM (Total Addressable Market)</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">{data.sam}</div>
                <div className="text-sm text-gray-600">SAM (Serviceable Addressable Market)</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{data.som}</div>
                <div className="text-sm text-gray-600">SOM (Serviceable Obtainable Market)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3-Year Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>3-Year Financial Projections</span>
          </CardTitle>
          <CardDescription>
            Detailed revenue, cost, and profitability forecasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Metric</th>
                  <th className="text-center py-3 px-4 font-semibold">Year 1</th>
                  <th className="text-center py-3 px-4 font-semibold">Year 2</th>
                  <th className="text-center py-3 px-4 font-semibold">Year 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Free Users</td>
                  <td className="text-center py-3 px-4">{projections.year1.users.free.toLocaleString()}</td>
                  <td className="text-center py-3 px-4">{projections.year2.users.free.toLocaleString()}</td>
                  <td className="text-center py-3 px-4">{projections.year3.users.free.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Paid Users</td>
                  <td className="text-center py-3 px-4">{projections.year1.users.paid.toLocaleString()}</td>
                  <td className="text-center py-3 px-4">{projections.year2.users.paid.toLocaleString()}</td>
                  <td className="text-center py-3 px-4">{projections.year3.users.paid.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-green-50">
                  <td className="py-3 px-4 font-medium">Revenue</td>
                  <td className="text-center py-3 px-4 font-semibold text-green-600">${projections.year1.revenue.toLocaleString()}</td>
                  <td className="text-center py-3 px-4 font-semibold text-green-600">${projections.year2.revenue.toLocaleString()}</td>
                  <td className="text-center py-3 px-4 font-semibold text-green-600">${projections.year3.revenue.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-red-50">
                  <td className="py-3 px-4 font-medium">Total Costs</td>
                  <td className="text-center py-3 px-4 font-semibold text-red-600">${projections.year1.costs.toLocaleString()}</td>
                  <td className="text-center py-3 px-4 font-semibold text-red-600">${projections.year2.costs.toLocaleString()}</td>
                  <td className="text-center py-3 px-4 font-semibold text-red-600">${projections.year3.costs.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-3 px-4 font-medium">Net Profit</td>
                  <td className="text-center py-3 px-4 font-semibold text-blue-600">${projections.year1.profit.toLocaleString()}</td>
                  <td className="text-center py-3 px-4 font-semibold text-blue-600">${projections.year2.profit.toLocaleString()}</td>
                  <td className="text-center py-3 px-4 font-semibold text-blue-600">${projections.year3.profit.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">YoY Growth</td>
                  <td className="text-center py-3 px-4">{projections.year1.growth}</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">{projections.year2.growth}</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">{projections.year3.growth}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Detailed Cost Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(costBreakdown).map(([category, data], index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold capitalize mb-2">{category}</h4>
                <p className="text-sm text-gray-600 mb-3">{data.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">${data.year1.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Year 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">${data.year2.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Year 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">${data.year3.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Year 3</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Key Business Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-1">${keyMetrics.cac}</div>
              <div className="text-sm text-gray-600">Customer Acquisition Cost</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">${keyMetrics.ltv}</div>
              <div className="text-sm text-gray-600">Customer Lifetime Value</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">{keyMetrics.churn}</div>
              <div className="text-sm text-gray-600">Monthly Churn Rate</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{keyMetrics.payback}</div>
              <div className="text-sm text-gray-600">CAC Payback Period</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Unit Economics Analysis</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• LTV:CAC Ratio: <strong>{Math.round(keyMetrics.ltv / keyMetrics.cac)}:1</strong> (Target: >3:1)</p>
              <p>• Monthly Revenue Per User: <strong>${Math.round(keyMetrics.ltv / 24)}</strong></p>
              <p>• Break-even timeline: <strong>{keyMetrics.payback}</strong></p>
              <p>• Customer retention indicates strong product-market fit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Funding Strategy & Scenarios</span>
          </CardTitle>
          <CardDescription>
            Different funding approaches and their implications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {fundingScenarios.map((scenario, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">{scenario.type}</h4>
                  <div className="text-right">
                    <div className="text-xl font-bold text-indigo-600">{scenario.amount}</div>
                    <div className="text-sm text-gray-600">{scenario.equity}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{scenario.timeline}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Advantages</h5>
                    <ul className="text-sm space-y-1">
                      {scenario.pros.map((pro, idx) => (
                        <li key={idx} className="text-green-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-700 mb-2">Considerations</h5>
                    <ul className="text-sm space-y-1">
                      {scenario.cons.map((con, idx) => (
                        <li key={idx} className="text-red-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Recommended Approach</h4>
            <p className="text-sm text-green-700">
              Based on the business model and market opportunity, we recommend starting bootstrapped 
              for the first 6-12 months to validate product-market fit, then pursuing a $200K-500K 
              angel round to accelerate customer acquisition and product development.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialProjections;
