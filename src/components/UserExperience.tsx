
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Monitor, Tablet, Eye, MousePointer, Keyboard } from 'lucide-react';

interface UserExperienceProps {
  idea: string;
  ideaData?: any;
}

const UserExperience = ({ idea, ideaData }: UserExperienceProps) => {
  const isRestaurantIdea = idea.toLowerCase().includes('restaurant');
  const isDesignIdea = idea.toLowerCase().includes('design');
  const isHRIdea = idea.toLowerCase().includes('hr') || idea.toLowerCase().includes('job');

  const getUserFlows = () => {
    if (isRestaurantIdea) {
      return {
        primaryFlow: "Photo Upload → AI Content Generation → Social Media Scheduling",
        userPersonas: [
          {
            name: "Busy Restaurant Owner",
            goals: ["Save time on social media", "Increase customer engagement", "Maintain consistent posting"],
            painPoints: ["No time for content creation", "Lack of design skills", "Inconsistent posting schedule"],
            devices: "Mobile-first (80% mobile usage)"
          },
          {
            name: "Restaurant Marketing Manager", 
            goals: ["Professional content creation", "Analytics and insights", "Brand consistency"],
            painPoints: ["Limited budget for design tools", "Need for quick turnaround", "Multiple location management"],
            devices: "Desktop and mobile (60/40 split)"
          }
        ],
        keyScreens: [
          "Dashboard with recent posts and analytics",
          "Photo upload with drag-and-drop interface",
          "AI content generation with editing options",
          "Social media scheduling calendar",
          "Analytics and performance insights"
        ]
      };
    } else if (isDesignIdea) {
      return {
        primaryFlow: "Template Creation → Marketplace Listing → Customer Customization → Purchase",
        userPersonas: [
          {
            name: "Freelance Designer",
            goals: ["Monetize design skills", "Build passive income", "Showcase portfolio"],
            painPoints: ["Inconsistent client work", "Low revenue from one-off projects", "Limited marketing reach"],
            devices: "Desktop-primary (90% desktop usage)"
          },
          {
            name: "Small Business Owner",
            goals: ["Professional website design", "Cost-effective solution", "Easy customization"],
            painPoints: ["Can't afford custom design", "No design experience", "Time constraints"],
            devices: "Mixed usage (50/50 desktop/mobile)"
          }
        ],
        keyScreens: [
          "Designer dashboard with earnings and templates",
          "Template creation studio with design tools",
          "Marketplace browsing with filtering",
          "Template customization interface",
          "Purchase and download flow"
        ]
      };
    } else {
      return {
        primaryFlow: "Problem Input → AI Analysis → Solution Generation → Implementation",
        userPersonas: [
          {
            name: "Business Professional",
            goals: ["Solve business problems efficiently", "Access expert insights", "Save time on analysis"],
            painPoints: ["Complex problem-solving", "Lack of specialized knowledge", "Time constraints"],
            devices: "Desktop-primary (70% desktop usage)"
          }
        ],
        keyScreens: [
          "Main dashboard with recent projects",
          "Problem input and analysis interface",
          "AI-generated solutions and recommendations",
          "Implementation guidance and resources",
          "Progress tracking and analytics"
        ]
      };
    }
  };

  const data = getUserFlows();

  const designSystem = {
    colorPalette: {
      primary: "#4F46E5", // Indigo-600
      secondary: "#9333EA", // Purple-600  
      accent: "#06B6D4", // Cyan-500
      success: "#10B981", // Emerald-500
      warning: "#F59E0B", // Amber-500
      error: "#EF4444", // Red-500
      neutral: {
        50: "#F9FAFB",
        100: "#F3F4F6", 
        200: "#E5E7EB",
        500: "#6B7280",
        900: "#111827"
      }
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      scale: {
        xs: "0.75rem",
        sm: "0.875rem", 
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      }
    },
    spacing: "8px base grid system",
    borderRadius: "8px default, 12px cards, 6px buttons"
  };

  const accessibilityFeatures = [
    "WCAG 2.1 AA compliance with color contrast ratios >4.5:1",
    "Semantic HTML structure with proper heading hierarchy",
    "ARIA labels and roles for all interactive elements",
    "Keyboard navigation support with visible focus indicators",
    "Screen reader compatibility with descriptive alt text",
    "Reduced motion support for users with vestibular disorders",
    "High contrast mode compatibility",
    "Text scaling support up to 200% without horizontal scrolling"
  ];

  const wireframes = [
    {
      screen: "Landing Page",
      layout: "Hero section with value proposition, feature highlights, pricing tiers, testimonials, and CTA",
      mobile: "Single column layout with collapsible navigation",
      desktop: "Multi-column layout with sidebar navigation"
    },
    {
      screen: "Dashboard",
      layout: "Main content area with sidebar navigation, quick stats cards, recent activity feed",
      mobile: "Bottom tab navigation with condensed cards",
      desktop: "Left sidebar with expanded feature cards and data tables"
    },
    {
      screen: "Main Feature Interface",
      layout: "Tool-focused design with primary action prominent, secondary features accessible but not distracting",
      mobile: "Full-screen interface with slide-up panels for secondary features",
      desktop: "Multi-panel layout with primary tool center, secondary tools in sidebars"
    }
  ];

  return (
    <div className="space-y-6">
      {/* User Personas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>User Personas & Journey Mapping</span>
          </CardTitle>
          <CardDescription>
            Detailed user research and journey analysis for target audiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Primary User Flow</h4>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium">{data.primaryFlow}</p>
              </div>
            </div>

            {data.userPersonas.map((persona, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">{persona.name}</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Goals</h5>
                    <ul className="text-sm space-y-1">
                      {persona.goals.map((goal, idx) => (
                        <li key={idx} className="text-green-600">• {goal}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-700 mb-2">Pain Points</h5>
                    <ul className="text-sm space-y-1">
                      {persona.painPoints.map((pain, idx) => (
                        <li key={idx} className="text-red-600">• {pain}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">Device Usage</h5>
                    <p className="text-sm text-blue-600">{persona.devices}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wireframes & Screen Layouts */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Wireframes & Screen Layouts</CardTitle>
          <CardDescription>
            Responsive design specifications for key user interface screens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {wireframes.map((wireframe, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">{wireframe.screen}</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2">Layout Structure</h5>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded">{wireframe.layout}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Mobile Layout
                      </h5>
                      <p className="text-sm text-gray-600">{wireframe.mobile}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center">
                        <Monitor className="h-4 w-4 mr-2" />
                        Desktop Layout
                      </h5>
                      <p className="text-sm text-gray-600">{wireframe.desktop}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Screens */}
      <Card>
        <CardHeader>
          <CardTitle>Essential Application Screens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {data.keyScreens.map((screen, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                <span className="font-medium text-indigo-800">{screen}</span>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-700">Required</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Design System */}
      <Card>
        <CardHeader>
          <CardTitle>Design System & Style Guide</CardTitle>
          <CardDescription>
            Comprehensive design specifications for consistent UI implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Color Palette */}
            <div>
              <h4 className="font-semibold mb-3">Color Palette</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: designSystem.colorPalette.primary}}></div>
                  <p className="text-sm font-medium">Primary</p>
                  <p className="text-xs text-gray-500">{designSystem.colorPalette.primary}</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: designSystem.colorPalette.secondary}}></div>
                  <p className="text-sm font-medium">Secondary</p>
                  <p className="text-xs text-gray-500">{designSystem.colorPalette.secondary}</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: designSystem.colorPalette.accent}}></div>
                  <p className="text-sm font-medium">Accent</p>
                  <p className="text-xs text-gray-500">{designSystem.colorPalette.accent}</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: designSystem.colorPalette.success}}></div>
                  <p className="text-sm font-medium">Success</p>
                  <p className="text-xs text-gray-500">{designSystem.colorPalette.success}</p>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <h4 className="font-semibold mb-3">Typography System</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Font Family:</strong> {designSystem.typography.fontFamily}</p>
                <p className="mb-2"><strong>Base Size:</strong> {designSystem.typography.scale.base}</p>
                <p><strong>Scale:</strong> xs({designSystem.typography.scale.xs}) → 4xl({designSystem.typography.scale["4xl"]})</p>
              </div>
            </div>

            {/* Component Guidelines */}
            <div>
              <h4 className="font-semibold mb-3">Component Specifications</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Spacing System</h5>
                  <p className="text-sm text-gray-600">{designSystem.spacing}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Border Radius</h5>
                  <p className="text-sm text-gray-600">{designSystem.borderRadius}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Design */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tablet className="h-5 w-5" />
            <span>Responsive Design Specifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Smartphone className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <h4 className="font-semibold mb-2">Mobile First</h4>
              <p className="text-sm text-gray-600 mb-3">320px - 768px</p>
              <ul className="text-xs text-gray-600 text-left space-y-1">
                <li>• Single column layouts</li>
                <li>• Touch-optimized controls (44px min)</li>
                <li>• Collapsible navigation</li>
                <li>• Swipe gestures support</li>
              </ul>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Tablet className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <h4 className="font-semibold mb-2">Tablet Optimized</h4>
              <p className="text-sm text-gray-600 mb-3">768px - 1024px</p>
              <ul className="text-xs text-gray-600 text-left space-y-1">
                <li>• Hybrid layouts</li>
                <li>• Adaptive sidebar</li>
                <li>• Touch and cursor support</li>
                <li>• Portrait/landscape modes</li>
              </ul>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Monitor className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <h4 className="font-semibold mb-2">Desktop Enhanced</h4>
              <p className="text-sm text-gray-600 mb-3">1024px+</p>
              <ul className="text-xs text-gray-600 text-left space-y-1">
                <li>• Multi-column layouts</li>
                <li>• Full feature accessibility</li>
                <li>• Keyboard shortcuts</li>
                <li>• Hover states and tooltips</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Keyboard className="h-5 w-5" />
            <span>Accessibility & Inclusive Design</span>
          </CardTitle>
          <CardDescription>
            WCAG 2.1 AA compliance and inclusive design principles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Accessibility Features</h4>
            <div className="grid gap-3">
              {accessibilityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-green-800">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">Testing & Validation</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Automated accessibility testing with axe-core</li>
                <li>• Manual keyboard navigation testing</li>
                <li>• Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                <li>• Color contrast validation tools</li>
                <li>• User testing with accessibility consultants</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserExperience;
