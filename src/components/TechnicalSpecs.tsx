
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Shield, Smartphone } from 'lucide-react';

interface TechnicalSpecsProps {
  idea: string;
}

const TechnicalSpecs = ({ idea }: TechnicalSpecsProps) => {
  const isRestaurantIdea = idea.toLowerCase().includes('restaurant');
  const isDesignIdea = idea.toLowerCase().includes('design');
  const isHRIdea = idea.toLowerCase().includes('hr') || idea.toLowerCase().includes('job');

  const getTechnicalData = () => {
    if (isRestaurantIdea) {
      return {
        coreFeatures: [
          "Photo upload and processing",
          "AI-powered content generation",
          "Social media scheduling",
          "Template customization",
          "Analytics dashboard"
        ],
        integrations: ["Instagram API", "Facebook API", "OpenAI API", "Cloudinary", "Stripe"],
        databaseSchema: ["users", "restaurants", "photos", "generated_content", "social_posts", "subscriptions"]
      };
    } else if (isDesignIdea) {
      return {
        coreFeatures: [
          "Template creation toolkit",
          "Drag-and-drop customization",
          "Marketplace browsing",
          "Revenue tracking",
          "Customer reviews"
        ],
        integrations: ["Stripe API", "PayPal API", "Figma API", "AWS S3", "SendGrid"],
        databaseSchema: ["users", "templates", "purchases", "reviews", "payments", "customizations"]
      };
    } else if (isHRIdea) {
      return {
        coreFeatures: [
          "Job description analyzer",
          "AI writing assistant",
          "Performance metrics",
          "Template library",
          "Team collaboration"
        ],
        integrations: ["OpenAI API", "LinkedIn API", "Indeed API", "Slack API", "Google Analytics"],
        databaseSchema: ["users", "companies", "job_descriptions", "analyses", "templates", "teams"]
      };
    } else {
      return {
        coreFeatures: [
          "Core automation engine",
          "User dashboard",
          "Data management",
          "Reporting tools",
          "Integration hub"
        ],
        integrations: ["Third-party APIs", "Webhook support", "OAuth providers", "Payment processing"],
        databaseSchema: ["users", "projects", "automations", "data", "integrations", "reports"]
      };
    }
  };

  const data = getTechnicalData();

  return (
    <div className="space-y-6">
      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Technical Architecture</span>
          </CardTitle>
          <CardDescription>Modern, scalable full-stack application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Frontend Stack</h4>
              <div className="space-y-2">
                <Badge variant="secondary">React 18</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Vite</Badge>
                <Badge variant="secondary">React Router</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Backend & Infrastructure</h4>
              <div className="space-y-2">
                <Badge variant="secondary">Supabase (Recommended)</Badge>
                <Badge variant="secondary">PostgreSQL Database</Badge>
                <Badge variant="secondary">Supabase Auth</Badge>
                <Badge variant="secondary">Edge Functions</Badge>
                <Badge variant="secondary">Vercel Hosting</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Features */}
      <Card>
        <CardHeader>
          <CardTitle>MVP Feature Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Must-Have Features (MVP)</h4>
            <div className="grid gap-3">
              {data.coreFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="font-medium text-green-800">{feature}</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700">MVP</Badge>
                </div>
              ))}
            </div>
            
            <h4 className="font-semibold mb-3 mt-6">Future Enhancements</h4>
            <div className="grid gap-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-800">Advanced AI features</span>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-800">Mobile app development</span>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-800">Advanced analytics</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Design */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Database Schema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {data.databaseSchema.map((table, index) => (
              <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="font-mono text-sm">{table}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-1">Database Features</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Row Level Security (RLS) policies</li>
              <li>• Real-time subscriptions</li>
              <li>• Automatic API generation</li>
              <li>• Built-in authentication</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Third-party Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Required Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {data.integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <span className="font-medium text-purple-800">{integration}</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-700">API</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security & Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Security Measures</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• JWT-based authentication</li>
                <li>• Row-level security policies</li>
                <li>• API rate limiting</li>
                <li>• Input validation</li>
                <li>• HTTPS encryption</li>
                <li>• GDPR compliance ready</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Performance Optimization</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Code splitting with React.lazy</li>
                <li>• Image optimization</li>
                <li>• Database indexing</li>
                <li>• CDN integration</li>
                <li>• Caching strategies</li>
                <li>• Bundle size optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Design */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Responsive Design Specifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h5 className="font-semibold mb-2">Mobile</h5>
                <p className="text-sm text-gray-600">320px - 768px</p>
                <p className="text-xs text-gray-500 mt-1">Touch-optimized UI</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h5 className="font-semibold mb-2">Tablet</h5>
                <p className="text-sm text-gray-600">768px - 1024px</p>
                <p className="text-xs text-gray-500 mt-1">Hybrid interface</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h5 className="font-semibold mb-2">Desktop</h5>
                <p className="text-sm text-gray-600">1024px+</p>
                <p className="text-xs text-gray-500 mt-1">Full feature set</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-1">Accessibility Features</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• WCAG 2.1 AA compliance</li>
                <li>• Keyboard navigation support</li>
                <li>• Screen reader compatibility</li>
                <li>• High contrast color schemes</li>
                <li>• Focus management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Development Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Development Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { phase: "Phase 1: Foundation", duration: "2-3 weeks", tasks: "Authentication, basic UI, database setup" },
              { phase: "Phase 2: Core Features", duration: "3-4 weeks", tasks: "Main functionality, API integrations" },
              { phase: "Phase 3: Polish & Testing", duration: "1-2 weeks", tasks: "UI refinement, testing, bug fixes" },
              { phase: "Phase 4: Launch Prep", duration: "1 week", tasks: "Deployment, monitoring, documentation" }
            ].map((phase, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div>
                  <h5 className="font-semibold text-indigo-800">{phase.phase}</h5>
                  <p className="text-sm text-gray-600">{phase.tasks}</p>
                </div>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-700">{phase.duration}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSpecs;
