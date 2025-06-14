
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Zap, Sparkles } from 'lucide-react';

export const AnalysisFeatures = () => {
  const analysisFeatures = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Market Analysis",
      description: "Comprehensive market sizing, trends, and opportunity assessment"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "User Personas",
      description: "Detailed target audience analysis and customer segmentation"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Technical Specs",
      description: "Complete system architecture and development roadmap"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Business Strategy",
      description: "Revenue models, pricing strategy, and growth planning"
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">What You'll Receive</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysisFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="text-indigo-600 mt-1">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
