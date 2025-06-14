
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Target, Shield, Zap } from 'lucide-react';

interface CompetitiveAnalysisProps {
  idea: string;
  ideaData?: any;
}

const CompetitiveAnalysis = ({ idea, ideaData }: CompetitiveAnalysisProps) => {
  const isRestaurantIdea = idea.toLowerCase().includes('restaurant');
  const isDesignIdea = idea.toLowerCase().includes('design');
  const isHRIdea = idea.toLowerCase().includes('hr') || idea.toLowerCase().includes('job');

  const getCompetitiveData = () => {
    if (isRestaurantIdea) {
      return {
        marketPosition: "Blue Ocean with Niche Focus",
        competitiveAdvantage: "AI-powered content generation specifically for food imagery",
        competitors: [
          {
            name: "Hootsuite",
            type: "Direct",
            marketShare: "15%",
            strengths: ["Established brand", "Multi-platform support", "Large user base"],
            weaknesses: ["Generic content tools", "No food specialization", "Complex interface"],
            pricing: "$49-739/month",
            userBase: "18M+ users",
            founded: "2008",
            revenue: "$200M+",
            threat: "Medium"
          },
          {
            name: "Buffer",
            type: "Direct",
            marketShare: "8%",
            strengths: ["Simple interface", "Good analytics", "Affordable pricing"],
            weaknesses: ["Limited AI features", "No industry focus", "Basic automation"],
            pricing: "$15-99/month",
            userBase: "75K+ businesses",
            founded: "2010",
            revenue: "$20M+",
            threat: "Medium"
          },
          {
            name: "Canva",
            type: "Indirect",
            marketShare: "25%",
            strengths: ["Excellent design tools", "Large template library", "User-friendly"],
            weaknesses: ["Not social-media focused", "No automation", "Generic templates"],
            pricing: "$12.99-30/month",
            userBase: "100M+ users",
            founded: "2013",
            revenue: "$1B+",
            threat: "Low"
          }
        ]
      };
    } else if (isDesignIdea) {
      return {
        marketPosition: "Marketplace Differentiator",
        competitiveAdvantage: "Designer-centric monetization with customization tools",
        competitors: [
          {
            name: "ThemeForest",
            type: "Direct",
            marketShare: "35%",
            strengths: ["Huge marketplace", "Established brand", "High traffic"],
            weaknesses: ["Poor designer revenue split", "Limited customization", "Outdated UI"],
            pricing: "30% commission",
            userBase: "10M+ buyers",
            founded: "2008",
            revenue: "$100M+",
            threat: "High"
          },
          {
            name: "Webflow Templates",
            type: "Direct",
            marketShare: "12%",
            strengths: ["Modern no-code platform", "Good design tools", "Growing community"],
            weaknesses: ["Platform locked", "Limited monetization", "Steep learning curve"],
            pricing: "$12-36/month",
            userBase: "3.5M+ users",
            founded: "2013",
            revenue: "$50M+",
            threat: "High"
          },
          {
            name: "Creative Market",
            type: "Indirect",
            marketShare: "8%",
            strengths: ["Curated quality", "Designer focused", "Good branding"],
            weaknesses: ["Limited to graphics", "No customization", "High competition"],
            pricing: "50% revenue split",
            userBase: "5M+ users",
            founded: "2012",
            revenue: "$30M+",
            threat: "Medium"
          }
        ]
      };
    } else {
      return {
        marketPosition: "AI-First Innovation",
        competitiveAdvantage: "Specialized AI analysis for specific industry requirements",
        competitors: [
          {
            name: "Industry Leader A",
            type: "Direct",
            marketShare: "20%",
            strengths: ["Market presence", "Established relationships", "Feature breadth"],
            weaknesses: ["Legacy architecture", "Slow innovation", "Generic approach"],
            pricing: "$50-200/month",
            userBase: "500K+ users",
            founded: "2015",
            revenue: "$100M+",
            threat: "Medium"
          },
          {
            name: "Emerging Competitor B",
            type: "Direct",
            marketShare: "8%",
            strengths: ["Modern tech stack", "Rapid growth", "VC backing"],
            weaknesses: ["Limited features", "Small team", "Narrow focus"],
            pricing: "$25-150/month",
            userBase: "100K+ users",
            founded: "2020",
            revenue: "$15M+",
            threat: "High"
          }
        ]
      };
    }
  };

  const data = getCompetitiveData();

  const swotAnalysis = {
    strengths: [
      "AI-powered specialized functionality",
      "Niche market focus with deep understanding",
      "Modern technology stack",
      "Agile development and rapid iteration",
      "Cost-effective pricing strategy"
    ],
    weaknesses: [
      "New brand with no market recognition",
      "Limited initial feature set",
      "Small team and resources",
      "No existing user base",
      "Dependency on third-party AI services"
    ],
    opportunities: [
      "Underserved niche market segment",
      "Growing demand for AI automation",
      "Potential for rapid customer acquisition",
      "Partnership opportunities with industry leaders",
      "Expansion into adjacent markets"
    ],
    threats: [
      "Large competitors entering niche market",
      "Economic downturn affecting small business spending",
      "Changes in social media platform policies",
      "AI technology becoming commoditized",
      "Data privacy regulation changes"
    ]
  };

  const getThreatIcon = (threat: string) => {
    switch (threat) {
      case 'High': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'Medium': return <Minus className="h-4 w-4 text-yellow-500" />;
      case 'Low': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Position */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Market Position & Competitive Advantage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Market Position</h4>
            <Badge variant="secondary" className="text-base px-3 py-1">
              {data.marketPosition}
            </Badge>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Core Competitive Advantage</h4>
            <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              {data.competitiveAdvantage}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Differentiation Strategy</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Focus on specific industry needs vs. generic solutions</li>
              <li>• AI-first approach with specialized algorithms</li>
              <li>• Superior user experience for target audience</li>
              <li>• Competitive pricing with better value proposition</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Competitor Analysis</CardTitle>
          <CardDescription>
            In-depth analysis of direct and indirect competitors in the market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.competitors.map((competitor, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{competitor.name}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <Badge variant={competitor.type === 'Direct' ? 'destructive' : 'secondary'}>
                        {competitor.type} Competitor
                      </Badge>
                      <span className="text-sm text-gray-600">Market Share: {competitor.marketShare}</span>
                      <div className="flex items-center space-x-1">
                        {getThreatIcon(competitor.threat)}
                        <span className="text-sm">{competitor.threat} Threat</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Strengths</h5>
                    <ul className="text-sm space-y-1">
                      {competitor.strengths.map((strength, idx) => (
                        <li key={idx} className="text-green-600">• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-700 mb-2">Weaknesses</h5>
                    <ul className="text-sm space-y-1">
                      {competitor.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="text-red-600">• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Pricing:</span>
                    <br />{competitor.pricing}
                  </div>
                  <div>
                    <span className="font-medium">Users:</span>
                    <br />{competitor.userBase}
                  </div>
                  <div>
                    <span className="font-medium">Founded:</span>
                    <br />{competitor.founded}
                  </div>
                  <div>
                    <span className="font-medium">Revenue:</span>
                    <br />{competitor.revenue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>SWOT Analysis</span>
          </CardTitle>
          <CardDescription>
            Strategic analysis of internal strengths/weaknesses and external opportunities/threats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Strengths (Internal Positive)
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                {swotAnalysis.strengths.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                <TrendingDown className="h-4 w-4 mr-2" />
                Weaknesses (Internal Negative)
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                {swotAnalysis.weaknesses.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Opportunities (External Positive)
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {swotAnalysis.opportunities.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Threats (External Negative)
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {swotAnalysis.threats.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Strategy & Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Short-term Strategy (0-6 months)</h4>
              <ul className="text-sm text-gray-600 space-y-1 bg-gray-50 p-4 rounded-lg">
                <li>• Focus on MVP development with core differentiating features</li>
                <li>• Build strong brand identity in niche market</li>
                <li>• Establish thought leadership through content marketing</li>
                <li>• Gather user feedback and iterate rapidly</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Medium-term Strategy (6-18 months)</h4>
              <ul className="text-sm text-gray-600 space-y-1 bg-gray-50 p-4 rounded-lg">
                <li>• Scale user acquisition through targeted marketing</li>
                <li>• Develop strategic partnerships in the industry</li>
                <li>• Expand feature set based on user demands</li>
                <li>• Build competitive moats through data and AI</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Long-term Strategy (18+ months)</h4>
              <ul className="text-sm text-gray-600 space-y-1 bg-gray-50 p-4 rounded-lg">
                <li>• Expand to adjacent markets and use cases</li>
                <li>• Consider acquisition of complementary tools</li>
                <li>• Develop enterprise solutions and pricing tiers</li>
                <li>• Establish market leadership position in niche</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitiveAnalysis;
