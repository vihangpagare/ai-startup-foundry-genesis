
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

interface IdeaFormProps {
  onExampleClick: (description: string) => void;
}

export const IdeaForm = ({ onExampleClick }: IdeaFormProps) => {
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
    
    navigate('/generating-reports');
  };

  // Expose setIdea for parent component to use with examples
  React.useEffect(() => {
    if (onExampleClick) {
      (window as any).__setIdea = setIdea;
    }
  }, [onExampleClick]);

  return (
    <Card className="border shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>Your SaaS Startup Details</span>
        </CardTitle>
        <CardDescription>
          Fill out the details below to generate a comprehensive AI-powered application that demonstrates your specific business model and functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company/Product Name (Optional)</Label>
            <Input
              id="companyName"
              placeholder="e.g., NeuroNest, FoodiePost, DesignMarket"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idea">Core SaaS Idea *</Label>
            <Textarea
              id="idea"
              placeholder="Describe your SaaS idea in detail. Include the core problem you're solving, your proposed solution, target users, and key features. Be specific about your industry and unique approach - this helps our AI generate a truly customized application interface..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-[120px] text-base"
              disabled={isProcessing}
              required
            />
            <div className="text-xs text-muted-foreground">
              💡 The more specific you are, the more customized your AI-generated application will be
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemStatement">Problem Statement</Label>
            <Textarea
              id="problemStatement"
              placeholder="What specific problem does your SaaS solve? Who experiences this problem and how painful is it for them? This helps generate realistic user scenarios in your app..."
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
              placeholder="e.g., Neurodiverse students and educators, Small restaurant owners, Freelance designers"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              disabled={isProcessing}
            />
            <div className="text-xs text-muted-foreground">
              Specific user types help generate personalized interfaces and workflows
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Proposed Solution</Label>
            <Textarea
              id="solution"
              placeholder="How does your SaaS solve the problem? What makes your approach unique? Describe key features and capabilities..."
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
                <span>Analyzing & Creating Your Custom App...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Generate AI-Powered Business Application</span>
              </div>
            )}
          </Button>

          {isProcessing && (
            <div className="text-center">
              <p className="text-sm text-primary animate-pulse">
                AI is analyzing your business model and creating a customized application interface...
              </p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
