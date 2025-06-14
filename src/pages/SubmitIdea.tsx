import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lightbulb, Loader2, Sparkles, Target, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SubmitIdea = () => {
  const [idea, setIdea] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [solution, setSolution] = useState('');
  const [uniqueValue, setUniqueValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      toast({
        title: "Error",
        description: "Please enter your startup idea",
        variant: "destructive",
      });
      return;
    }

    const ideaData = {
      idea,
      companyName,
      targetAudience,
      problemStatement,
      solution,
      uniqueValue,
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem('saasIdea', JSON.stringify(ideaData));
    
    toast({
      title: "Idea Submitted!",
      description: "Generating your comprehensive startup analysis...",
    });
    
    // Navigate to generation page instead of results
    navigate('/generating-reports');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm">
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
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Startup Foundry
                </h1>
                <p className="text-sm text-gray-600">Comprehensive Business Builder</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Describe Your SaaS Startup Idea
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Provide detailed information about your SaaS concept. The more specific you are, 
            the more comprehensive and tailored your business package will be.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-indigo-600" />
                  <span>Your SaaS Startup Details</span>
                </CardTitle>
                <CardDescription>
                  Fill out the details below to get the most comprehensive analysis possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company/Product Name (Optional)</Label>
                    <Input
                      id="companyName"
                      placeholder="e.g., FoodiePost, DesignMarket, HireWise"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idea">Core SaaS Idea *</Label>
                    <Textarea
                      id="idea"
                      placeholder="Describe your SaaS idea in detail. Include the core problem you're solving, your proposed solution, key features, and target users. Be as specific as possible..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="min-h-[120px] text-base"
                      disabled={isProcessing}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problemStatement">Problem Statement</Label>
                    <Textarea
                      id="problemStatement"
                      placeholder="What specific problem does your SaaS solve? Who experiences this problem and how painful is it for them?"
                      value={problemStatement}
                      onChange={(e) => setProblemStatement(e.target.value)}
                      className="min-h-[80px]"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      placeholder="e.g., Small restaurant owners, Freelance designers, HR managers at mid-size companies"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="solution">Proposed Solution</Label>
                    <Textarea
                      id="solution"
                      placeholder="How does your SaaS solve the problem? What makes your approach unique or better than existing solutions?"
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      className="min-h-[80px]"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                    <Input
                      id="uniqueValue"
                      placeholder="What makes your solution different from competitors? What's your key differentiator?"
                      value={uniqueValue}
                      onChange={(e) => setUniqueValue(e.target.value)}
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-4 text-lg shadow-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating Your Startup Package...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5" />
                        <span>Generate Complete Startup Package</span>
                      </div>
                    )}
                  </Button>

                  {isProcessing && (
                    <div className="text-center">
                      <p className="text-sm text-indigo-600 animate-pulse">{processingStep}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Analysis Features */}
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

            {/* Processing Time */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">~10-15 min</div>
                  <p className="text-sm text-gray-600">Comprehensive analysis time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Example Ideas */}
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
                  onClick={() => !isProcessing && setFormData({
                    ...formData,
                    idea: example.description,
                    companyName: example.title.split(' ')[0] + (example.title.split(' ')[1] || '')
                  })}
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
      </main>
    </div>
  );
};

export default SubmitIdea;
