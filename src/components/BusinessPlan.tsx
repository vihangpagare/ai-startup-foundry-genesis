
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Target, TrendingUp, Users, Lightbulb, Shield } from 'lucide-react';

interface BusinessPlanProps {
  idea: string;
  ideaData?: any;
}

const BusinessPlan = ({ idea, ideaData }: BusinessPlanProps) => {
  // Extract key details from the idea
  const isRestaurantIdea = idea.toLowerCase().includes('restaurant');
  const isDesignIdea = idea.toLowerCase().includes('design');
  const isHRIdea = idea.toLowerCase().includes('hr') || idea.toLowerCase().includes('job');

  const getBusinessPlanData = () => {
    if (isRestaurantIdea) {
      return {
        industry: "Restaurant Technology & Social Media Management",
        marketSize: "$15.2B",
        targetSegment: "Small to medium restaurants (5-100 locations)",
        competition: ["Hootsuite", "Buffer", "Canva", "Later"],
        revenueModel: ["Freemium", "Basic $29/month", "Pro $79/month", "Enterprise $199/month"],
        yearOneRevenue: "$180K",
        missionStatement: "Empowering restaurants to build authentic connections with their customers through AI-powered social media content.",
        visionStatement: "To become the leading social media automation platform specifically designed for the food service industry.",
        valueProposition: "Transform your daily menu photos into engaging social media content that drives customer engagement and restaurant visits."
      };
    } else if (isDesignIdea) {
      return {
        industry: "Design Tools & Creative Marketplace",
        marketSize: "$8.4B",
        targetSegment: "Freelance designers and small agencies",
        competition: ["Templatemonster", "ThemeForest", "Webflow", "Creative Market"],
        revenueModel: ["Commission-based", "15% platform fee", "Pro $49/month + 10%", "Enterprise $149/month + 5%"],
        yearOneRevenue: "$95K",
        missionStatement: "Democratizing web design by enabling designers to monetize their creativity while providing businesses with affordable, customizable solutions.",
        visionStatement: "To create the world's most designer-friendly marketplace for customizable web templates.",
        valueProposition: "Monetize your design skills through our intelligent marketplace while helping businesses get professional websites they can customize themselves."
      };
    } else if (isHRIdea) {
      return {
        industry: "HR Technology & Talent Acquisition",
        marketSize: "$24.3B",
        targetSegment: "Mid-size companies (100-1000 employees)",
        competition: ["LinkedIn Talent", "Indeed", "ZipRecruiter", "Workday"],
        revenueModel: ["Per-job posting $99", "Unlimited $299/month", "Enterprise custom pricing"],
        yearOneRevenue: "$240K",
        missionStatement: "Revolutionizing talent acquisition by helping companies write job descriptions that attract the right candidates.",
        visionStatement: "To become the AI-powered solution that transforms how companies communicate their value proposition to potential employees.",
        valueProposition: "Leverage AI insights to write job descriptions that attract top talent and reduce time-to-hire by 40%."
      };
    } else {
      return {
        industry: "SaaS Technology & Business Automation",
        marketSize: "$195B",
        targetSegment: "Small to medium businesses",
        competition: ["Various established players"],
        revenueModel: ["Tiered subscription", "Starter $19/month", "Pro $59/month", "Enterprise $149/month"],
        yearOneRevenue: "$150K",
        missionStatement: "Simplifying business operations through intelligent automation and user-friendly design.",
        visionStatement: "To become the go-to platform for small businesses looking to automate and optimize their operations.",
        valueProposition: "Streamline your business operations with intelligent automation designed specifically for your industry."
      };
    }
  };

  const data = getBusinessPlanData();

  const executiveSummary = {
    businessConcept: ideaData?.idea || idea,
    problemStatement: ideaData?.problemStatement || "Significant operational inefficiencies and manual processes are limiting business growth and customer satisfaction.",
    solution: ideaData?.solution || "An AI-powered SaaS platform that automates key business processes while maintaining quality and personalization.",
    targetMarket: ideaData?.targetAudience || data.targetSegment,
    competitiveAdvantage: "Specialized AI technology combined with industry-specific expertise and user-centric design.",
    financialHighlights: `Projected ${data.yearOneRevenue} revenue in Year 1, with 95% gross margins and path to profitability by Month 10.`,
    fundingRequest: "Seeking $200K-500K seed funding to accelerate product development and customer acquisition."
  };

  const marketAnalysis = {
    industryOverview: `The ${data.industry} sector is experiencing rapid growth driven by digital transformation and increasing demand for automation solutions.`,
    marketTrends: [
      "Accelerating adoption of AI and automation technologies",
      "Shift towards specialized, industry-specific solutions",
      "Growing demand for user-friendly, no-code platforms", 
      "Increased focus on data-driven decision making",
      "Rising costs of manual operations driving automation adoption"
    ],
    targetCustomers: [
      {
        segment: "Primary Target",
        description: data.targetSegment,
        size: "~2.5M potential customers",
        painPoints: ["Time-consuming manual processes", "Lack of specialized tools", "High operational costs"],
        willingness: "High willingness to pay for efficiency gains"
      },
      {
        segment: "Secondary Target", 
        description: "Larger enterprises seeking efficiency",
        size: "~500K potential customers",
        painPoints: ["Complex integration needs", "Scalability challenges", "ROI measurement"],
        willingness: "Moderate to high willingness with proven ROI"
      }
    ]
  };

  const operationalPlan = {
    businessModel: "B2B SaaS with freemium model to drive user acquisition and subscription upgrades",
    keyActivities: [
      "Product development and engineering",
      "Customer acquisition and marketing", 
      "Customer success and support",
      "Strategic partnerships and integrations"
    ],
    keyResources: [
      "Proprietary AI algorithms and technology stack",
      "Talented engineering and product team",
      "Customer data and usage insights",
      "Brand reputation and market positioning"
    ],
    keyPartners: [
      "Cloud infrastructure providers (AWS, Google Cloud)",
      "AI/ML service providers (OpenAI, Anthropic)",
      "Industry associations and trade organizations",
      "Complementary software vendors for integrations"
    ]
  };

  const managementTeam = [
    {
      role: "CEO/Founder",
      responsibilities: "Overall strategy, fundraising, partnership development",
      ideal: "Strong business background with industry experience and proven leadership skills"
    },
    {
      role: "CTO/Co-Founder", 
      responsibilities: "Product development, technical architecture, engineering team management",
      ideal: "Senior engineering background with AI/ML expertise and startup experience"
    },
    {
      role: "Head of Marketing",
      responsibilities: "Customer acquisition, brand building, content marketing, PR",
      ideal: "B2B SaaS marketing experience with proven track record of scaling customer acquisition"
    },
    {
      role: "Head of Customer Success",
      responsibilities: "Customer onboarding, retention, support, feedback collection",
      ideal: "Customer-focused background with experience in subscription business models"
    }
  ];

  const riskAnalysis = [
    {
      risk: "Competitive Response",
      level: "Medium",
      description: "Large players entering niche market",
      mitigation: "Build strong moats through data, customer relationships, and rapid innovation"
    },
    {
      risk: "Technology Dependencies", 
      level: "Medium",
      description: "Reliance on third-party AI services",
      mitigation: "Diversify AI providers and develop proprietary algorithms over time"
    },
    {
      risk: "Market Adoption",
      level: "Low-Medium", 
      description: "Slower than expected customer adoption",
      mitigation: "Extensive market validation, strong onboarding, and customer success programs"
    },
    {
      risk: "Economic Downturn",
      level: "Medium",
      description: "Reduced spending on new software tools",
      mitigation: "Focus on ROI-driven positioning and flexible pricing models"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Executive Summary</span>
          </CardTitle>
          <CardDescription>
            Comprehensive overview of the business opportunity and strategic approach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Business Concept</h4>
            <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              {executiveSummary.businessConcept}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Problem Statement</h4>
              <p className="text-gray-600">{executiveSummary.problemStatement}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Our Solution</h4>
              <p className="text-gray-600">{executiveSummary.solution}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Value Proposition</h4>
            <p className="text-lg text-indigo-600 font-medium bg-indigo-50 p-4 rounded-lg">
              {data.valueProposition}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Financial Highlights</h4>
              <p className="text-gray-600">{executiveSummary.financialHighlights}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Funding Request</h4>
              <p className="text-gray-600">{executiveSummary.fundingRequest}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>Company Description</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Mission Statement</h4>
            <p className="text-gray-600 italic bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              "{data.missionStatement}"
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Vision Statement</h4>
            <p className="text-gray-600 italic bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              "{data.visionStatement}"
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Core Values</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Badge variant="secondary">Innovation</Badge>
                <p className="text-sm text-gray-600">Constantly pushing boundaries with AI technology</p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary">Customer Success</Badge>
                <p className="text-sm text-gray-600">Obsessed with delivering measurable value to customers</p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary">Simplicity</Badge>
                <p className="text-sm text-gray-600">Making complex technology accessible and user-friendly</p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary">Transparency</Badge>
                <p className="text-sm text-gray-600">Open communication and honest business practices</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Market Analysis</span>
          </CardTitle>
          <CardDescription>Industry overview and target market assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Industry Overview</h4>
            <p className="text-gray-600 mb-4">{marketAnalysis.industryOverview}</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{data.marketSize}</div>
                <div className="text-sm text-gray-600">Total Market Size</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">12-15%</div>
                <div className="text-sm text-gray-600">Annual Growth Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">3M+</div>
                <div className="text-sm text-gray-600">Target Customers</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Market Trends</h4>
            <div className="space-y-2">
              {marketAnalysis.marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">{trend}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Target Customer Segments</h4>
            <div className="space-y-4">
              {marketAnalysis.targetCustomers.map((segment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">{segment.segment}</h5>
                    <Badge variant="outline">{segment.size}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{segment.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-red-700 mb-1">Key Pain Points</h6>
                      <ul className="text-sm text-red-600 space-y-1">
                        {segment.painPoints.map((pain, idx) => (
                          <li key={idx}>• {pain}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-green-700 mb-1">Buying Behavior</h6>
                      <p className="text-sm text-green-600">{segment.willingness}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Operational Plan & Business Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Business Model</h4>
            <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">{operationalPlan.businessModel}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Key Activities</h4>
              <ul className="space-y-2">
                {operationalPlan.keyActivities.map((activity, index) => (
                  <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">• {activity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Key Resources</h4>
              <ul className="space-y-2">
                {operationalPlan.keyResources.map((resource, index) => (
                  <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">• {resource}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Key Partners</h4>
              <ul className="space-y-2">
                {operationalPlan.keyPartners.map((partner, index) => (
                  <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">• {partner}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Management Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Management Team & Organization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {managementTeam.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">{member.role}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-700 mb-1">Key Responsibilities</h5>
                    <p className="text-sm text-gray-600">{member.responsibilities}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-700 mb-1">Ideal Background</h5>
                    <p className="text-sm text-gray-600">{member.ideal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Risk Analysis & Mitigation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAnalysis.map((risk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{risk.risk}</h4>
                  <Badge 
                    variant={risk.level === 'High' ? 'destructive' : risk.level === 'Medium' ? 'default' : 'secondary'}
                  >
                    {risk.level} Risk
                  </Badge>
                </div>
                <p className="text-gray-600 mb-2">{risk.description}</p>
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <h5 className="font-medium text-green-800 mb-1">Mitigation Strategy</h5>
                  <p className="text-sm text-green-700">{risk.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPlan;
