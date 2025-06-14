
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BusinessPlanProps {
  idea: string;
}

const BusinessPlan = ({ idea }: BusinessPlanProps) => {
  // Extract key details from the idea (this would be more sophisticated in a real implementation)
  const isRestaurantIdea = idea.toLowerCase().includes('restaurant');
  const isDesignIdea = idea.toLowerCase().includes('design');
  const isHRIdea = idea.toLowerCase().includes('hr') || idea.toLowerCase().includes('job');

  const getBusinessPlanData = () => {
    if (isRestaurantIdea) {
      return {
        industry: "Restaurant Technology",
        marketSize: "$15.2B",
        targetSegment: "Small to medium restaurants (5-50 locations)",
        competition: ["Hootsuite", "Buffer", "Canva"],
        revenueModel: ["Freemium", "$29/month Standard", "$99/month Premium"],
        yearOneRevenue: "$180K"
      };
    } else if (isDesignIdea) {
      return {
        industry: "Design & Creative Tools",
        marketSize: "$8.4B",
        targetSegment: "Freelance designers and small agencies",
        competition: ["Templatemonster", "ThemeForest", "Webflow"],
        revenueModel: ["Commission-based", "15% platform fee", "Premium listings"],
        yearOneRevenue: "$95K"
      };
    } else if (isHRIdea) {
      return {
        industry: "HR Technology",
        marketSize: "$24.3B",
        targetSegment: "Mid-size companies (100-1000 employees)",
        competition: ["LinkedIn Talent", "Indeed", "ZipRecruiter"],
        revenueModel: ["Per-job posting", "$99/month unlimited", "Enterprise custom"],
        yearOneRevenue: "$240K"
      };
    } else {
      return {
        industry: "SaaS Technology",
        marketSize: "$195B",
        targetSegment: "Small to medium businesses",
        competition: ["Various established players"],
        revenueModel: ["Tiered subscription", "$19-99/month", "Enterprise plans"],
        yearOneRevenue: "$150K"
      };
    }
  };

  const data = getBusinessPlanData();

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Business Concept</h4>
            <p className="text-gray-600">{idea}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Value Proposition</h4>
            <p className="text-gray-600">
              Streamline operations, reduce manual work, and improve efficiency through automation and AI-powered solutions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
          <CardDescription>Industry overview and target market assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Market Overview</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Industry:</span>
                  <Badge variant="secondary">{data.industry}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Market Size:</span>
                  <span className="font-medium">{data.marketSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Growth Rate:</span>
                  <span className="font-medium text-green-600">12-15% annually</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Target Segment</h4>
              <p className="text-gray-600 mb-3">{data.targetSegment}</p>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Key Pain Points:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Time-consuming manual processes</li>
                  <li>• Lack of specialized tools</li>
                  <li>• High operational costs</li>
                  <li>• Inconsistent quality output</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Landscape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-semibold">Main Competitors</h4>
            <div className="grid gap-3">
              {data.competition.map((competitor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{competitor}</span>
                  <Badge variant="outline">Indirect Competitor</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Competitive Advantages</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Specialized focus on target industry</li>
                <li>• AI-powered automation capabilities</li>
                <li>• User-friendly interface design</li>
                <li>• Competitive pricing model</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Model */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Model & Projections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Pricing Strategy</h4>
              <div className="space-y-2">
                {data.revenueModel.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{tier}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Financial Projections</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Year 1 Revenue:</span>
                  <span className="font-medium text-green-600">{data.yearOneRevenue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Break-even:</span>
                  <span className="font-medium">Month 8-10</span>
                </div>
                <div className="flex justify-between">
                  <span>Initial Investment:</span>
                  <span className="font-medium">$50K-75K</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPlan;
