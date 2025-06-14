import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MarketingStrategyProps {
  idea: string;
  ideaData?: any;
}

const MarketingStrategy = ({ idea, ideaData }: MarketingStrategyProps) => {
  const isRestaurantIdea = idea.toLowerCase().includes('restaurant');
  const isDesignIdea = idea.toLowerCase().includes('design');
  const isHRIdea = idea.toLowerCase().includes('hr') || idea.toLowerCase().includes('job');

  const getMarketingData = () => {
    if (isRestaurantIdea) {
      return {
        primaryChannels: ["Instagram Marketing", "Facebook Ads", "Restaurant Industry Forums", "Local Business Networks"],
        messaging: "Transform your menu photos into viral social content",
        contentIdeas: [
          "Before/After social media transformations",
          "Restaurant owner success stories",
          "Social media tips for restaurants",
          "Menu photography best practices"
        ],
        launchStrategy: "Beta launch with 10 local restaurants → Social proof → Paid advertising"
      };
    } else if (isDesignIdea) {
      return {
        primaryChannels: ["Dribbble", "Behance", "Design Twitter", "Designer Communities", "LinkedIn"],
        messaging: "Monetize your design skills with custom template marketplace",
        contentIdeas: [
          "Template creation tutorials",
          "Designer income case studies",
          "Web design trend analysis",
          "Client work vs. template revenue comparison"
        ],
        launchStrategy: "Invite top designers → Exclusive early access → Community-driven growth"
      };
    } else if (isHRIdea) {
      return {
        primaryChannels: ["LinkedIn Ads", "HR Conferences", "HR Podcasts", "Industry Publications"],
        messaging: "Write job descriptions that attract top talent with AI insights",
        contentIdeas: [
          "Job description optimization tips",
          "Hiring success metrics",
          "Industry-specific hiring guides",
          "AI in recruitment best practices"
        ],
        launchStrategy: "HR community partnerships → Free tool trial → Enterprise sales"
      };
    } else {
      return {
        primaryChannels: ["Content Marketing", "LinkedIn", "Industry Forums", "Paid Search"],
        messaging: "Streamline your business operations with intelligent automation",
        contentIdeas: [
          "Industry-specific case studies",
          "Productivity improvement guides",
          "Automation best practices",
          "ROI calculation tools"
        ],
        launchStrategy: "Content-driven approach → Lead generation → Free trial conversion"
      };
    }
  };

  const data = getMarketingData();

  return (
    <div className="space-y-6">
      {/* Brand Messaging */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Positioning & Messaging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Core Message</h4>
            <p className="text-lg text-indigo-600 font-medium">{data.messaging}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Value Propositions</h4>
            <div className="grid gap-2">
              <Badge variant="secondary">Save 5+ hours per week</Badge>
              <Badge variant="secondary">Increase efficiency by 40%</Badge>
              <Badge variant="secondary">Professional results without expertise</Badge>
              <Badge variant="secondary">Affordable for small businesses</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Brand Voice</h4>
            <p className="text-gray-600">Professional yet approachable, innovative but reliable, empowering small businesses to compete with larger competitors.</p>
          </div>
        </CardContent>
      </Card>

      {/* Go-to-Market Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Go-to-Market Strategy</CardTitle>
          <CardDescription>Phase-by-phase launch approach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Launch Strategy</h4>
              <p className="text-gray-600">{data.launchStrategy}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Primary Marketing Channels</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {data.primaryChannels.map((channel, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">{channel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Content Marketing Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Content Pillars</h4>
            <div className="grid gap-3">
              {data.contentIdeas.map((content, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <span className="text-gray-700">{content}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Content Calendar</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• 2-3 blog posts per week</div>
                <div>• Daily social media posts</div>
                <div>• Weekly video tutorials</div>
                <div>• Monthly case studies</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Acquisition Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Acquisition Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: "Awareness", tactics: "SEO content, social media, PR", metric: "1000 monthly visitors" },
              { stage: "Interest", tactics: "Free resources, webinars, email capture", metric: "15% email signup rate" },
              { stage: "Consideration", tactics: "Free trial, demo videos, case studies", metric: "25% trial signup" },
              { stage: "Purchase", tactics: "Onboarding, customer success, pricing incentives", metric: "20% trial-to-paid conversion" },
              { stage: "Retention", tactics: "Customer success, feature updates, community", metric: "85% monthly retention" }
            ].map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
                <div>
                  <h5 className="font-semibold text-indigo-800">{stage.stage}</h5>
                  <p className="text-sm text-gray-600">{stage.tactics}</p>
                </div>
                <Badge variant="outline">{stage.metric}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Monetization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-2">Starter</h4>
              <div className="text-2xl font-bold text-indigo-600 mb-2">Free</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 5 projects/month</li>
                <li>• Basic features</li>
                <li>• Email support</li>
              </ul>
            </div>
            <div className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50">
              <h4 className="font-semibold mb-2">Professional</h4>
              <div className="text-2xl font-bold text-indigo-600 mb-2">$29/mo</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Unlimited projects</li>
                <li>• Advanced features</li>
                <li>• Priority support</li>
                <li>• Analytics dashboard</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-2">Enterprise</h4>
              <div className="text-2xl font-bold text-indigo-600 mb-2">$99/mo</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Everything in Pro</li>
                <li>• Team collaboration</li>
                <li>• Custom integrations</li>
                <li>• Dedicated support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingStrategy;
