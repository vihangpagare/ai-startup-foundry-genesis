
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, Sparkles, Zap, Target, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { claudeAIAppSelector } from '@/services/claudeAIAppSelector';

interface AIAppGeneratorProps {
  ideaData: any;
  reports: Record<string, string>;
  onAppSelected: (template: AppTemplate, customization: AppCustomization) => void;
}

const AIAppGenerator = ({ ideaData, reports, onAppSelected }: AIAppGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const { toast } = useToast();

  const generateAppWithAI = async () => {
    setIsGenerating(true);
    setAnalysis('Analyzing your startup data with Claude AI...');
    
    try {
      console.log('Starting AI app generation with data:', {
        company: ideaData?.companyName,
        reports: Object.keys(reports)
      });

      const result = await claudeAIAppSelector.generateAppContentWithAI(
        ideaData,
        reports
      );

      if (result.template && result.customization) {
        setAnalysis(result.reasoning);
        setConfidence(result.confidence);
        
        // Small delay to show the analysis
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: "AI App Generation Complete!",
          description: `Selected ${result.template.name} with ${Math.round(result.confidence * 100)}% confidence`,
        });
        
        onAppSelected(result.template, result.customization);
      } else {
        throw new Error('No app template or customization returned');
      }
    } catch (error: any) {
      console.error('AI app generation error:', error);
      setAnalysis('');
      toast({
        title: "AI Generation Failed",
        description: error.message || "Could not generate app. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
            </div>
            <CardTitle className="text-2xl text-purple-900">Claude AI is Analyzing Your Startup</CardTitle>
            <CardDescription className="text-purple-700">
              Processing business reports and selecting the perfect app template...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
            
            <div className="bg-white/70 rounded-lg p-4 min-h-[120px]">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Analysis in Progress
              </h4>
              <p className="text-purple-800 leading-relaxed">
                {analysis || 'Claude is examining your business model, target audience, and generated reports to determine the optimal app architecture...'}
              </p>
              {confidence > 0 && (
                <div className="mt-3 flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    Confidence: {Math.round(confidence * 100)}%
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/70 rounded-lg p-3">
                <Target className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-blue-800">Analyzing Business Model</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <Zap className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-orange-800">Matching Templates</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <Brain className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-purple-800">Generating Content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main AI Generator Card */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
            Claude AI App Generator
          </CardTitle>
          <CardDescription className="text-lg text-gray-700 max-w-2xl mx-auto">
            Let Claude AI analyze your {Object.keys(reports).length} business reports and automatically create a personalized 3-page web application tailored to your startup
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Intelligent Template Selection</h3>
                  <p className="text-gray-600 text-sm">
                    Claude analyzes your business model, target audience, and market research to select the perfect app template from our collection
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personalized Content Generation</h3>
                  <p className="text-gray-600 text-sm">
                    AI generates custom copy, creates realistic mock data, and tailors the entire app interface to your specific industry and use case
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">3-Page Interactive App</h3>
                  <p className="text-gray-600 text-sm">
                    Get a fully functional app with navigation, forms, data visualization, and user interactions across three core pages
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Production-Ready Code</h3>
                  <p className="text-gray-600 text-sm">
                    Export complete React components with proper routing, state management, and modern UI components ready for development
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Report Analysis Summary */}
          <div className="bg-white/80 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-indigo-600" />
              Available Data for AI Analysis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(reports).map(([reportType, content]) => (
                <div key={reportType} className="text-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700 capitalize">
                    {reportType.replace('-', ' ')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.round(content.length / 100)} sections
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button 
              onClick={generateAppWithAI}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
            >
              <Brain className="h-5 w-5 mr-2" />
              Generate My App with Claude AI
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
              <span className="text-sm font-medium text-amber-800">Powered by Claude AI</span>
            </div>
            <p className="text-xs text-amber-700">
              The AI will analyze your business reports to create a customized app. Generation typically takes 10-15 seconds.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAppGenerator;
