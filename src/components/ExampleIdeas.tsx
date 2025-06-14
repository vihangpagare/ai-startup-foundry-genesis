
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExampleIdeasProps {
  onExampleClick: (description: string) => void;
  isProcessing: boolean;
}

export const ExampleIdeas = ({ onExampleClick, isProcessing }: ExampleIdeasProps) => {
  const exampleIdeas = [
    {
      title: "Restaurant Social Media Automation",
      description: "A SaaS tool that helps small restaurant owners automatically generate social media content from their daily menu photos using AI, targeting busy restaurant managers who struggle to maintain consistent social media presence.",
      industry: "Food & Beverage Tech"
    },
    {
      title: "Designer Template Marketplace",
      description: "A platform that allows freelance designers to create and sell custom website templates with drag-and-drop customization, targeting small businesses and non-technical entrepreneurs.",
      industry: "Design & Creative Tools"
    },
    {
      title: "AI-Powered Job Description Optimizer",
      description: "An AI tool that helps HR teams write better job descriptions by analyzing successful postings in their industry and suggesting improvements for better candidate attraction.",
      industry: "HR Technology"
    },
    {
      title: "Wedding Planning Coordination Platform",
      description: "A project management tool specifically designed for wedding planners to coordinate vendors, timelines, and client communications with specialized workflow automation.",
      industry: "Event Management"
    }
  ];

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Need Inspiration? Example SaaS Ideas</CardTitle>
        <CardDescription>
          Click any example to see how detailed descriptions lead to better analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {exampleIdeas.map((example, index) => (
            <div 
              key={index}
              className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg cursor-pointer hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-gray-200 hover:border-indigo-200"
              onClick={() => !isProcessing && onExampleClick(example.description)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">{example.title}</h4>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                  {example.industry}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{example.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
