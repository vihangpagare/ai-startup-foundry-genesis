
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Lightbulb, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SubmitIdea = () => {
  const [idea, setIdea] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      toast({
        title: "Please describe your SaaS idea",
        description: "We need your idea description to create your startup package.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Store the idea in localStorage for the results page
      localStorage.setItem('saasIdea', idea);
      navigate('/results');
    }, 3000);
  };

  const exampleIdeas = [
    "A SaaS tool that helps small restaurant owners automatically generate social media content from their daily menu photos",
    "A platform that allows freelance designers to create and sell custom website templates with drag-and-drop customization",
    "An AI-powered tool that helps HR teams write better job descriptions by analyzing successful postings in their industry",
    "A project management tool specifically designed for wedding planners to coordinate vendors, timelines, and client communications"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Startup Foundry</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Describe Your SaaS Startup Idea
          </h2>
          <p className="text-lg text-gray-600">
            Be as detailed as possible about the problem you're solving and your proposed solution
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your SaaS Idea</CardTitle>
            <CardDescription>
              Include the core problem, your solution, and target users if you have them in mind
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                placeholder="Example: A SaaS tool that helps small restaurant owners automatically generate social media content from their daily menu photos using AI, targeting busy restaurant managers who struggle to maintain consistent social media presence..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-[200px] text-base"
                disabled={isProcessing}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Startup Package...
                  </>
                ) : (
                  'Generate My Startup Package'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Example Ideas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Need Inspiration? Here are some example ideas:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exampleIdeas.map((example, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => !isProcessing && setIdea(example)}
                >
                  <p className="text-sm text-gray-700">"{example}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SubmitIdea;
