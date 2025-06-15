
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Brain, CheckCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';
import { aiTemplateSelector } from '@/services/aiTemplateSelector';

interface AILandingPageGeneratorProps {
  ideaData: any;
  reports: Record<string, string>;
  onTemplateSelected: (template: LandingPageTemplate, customization: TemplateCustomization) => void;
  onManualSelection: () => void;
}

const AILandingPageGenerator = ({ 
  ideaData, 
  reports, 
  onTemplateSelected, 
  onManualSelection 
}: AILandingPageGeneratorProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<LandingPageTemplate | null>(null);
  const [customization, setCustomization] = useState<TemplateCustomization | null>(null);
  const [reasoning, setReasoning] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const { toast } = useToast();

  const handleAIGenerate = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Analyze startup data
      const analysis = aiTemplateSelector.analyzeStartupFromReports(ideaData, reports);
      console.log('Startup analysis:', analysis);
      
      // Select best template
      const { template, reasoning: templateReasoning } = aiTemplateSelector.selectBestTemplate(analysis);
      
      if (template) {
        // Generate customization
        const generatedCustomization = aiTemplateSelector.createCustomization(template, analysis, ideaData);
        
        setSelectedTemplate(template);
        setCustomization(generatedCustomization);
        setReasoning(templateReasoning);
        setConfidence(0.85); // Mock confidence score
        
        toast({
          title: "AI Analysis Complete!",
          description: `Selected ${template.name} template with AI-generated content.`,
        });
      } else {
        toast({
          title: "Manual Selection Recommended",
          description: templateReasoning,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        title: "AI Analysis Failed",
        description: "Could not analyze startup data. Please try manual selection.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptAISelection = () => {
    if (selectedTemplate && customization) {
      onTemplateSelected(selectedTemplate, customization);
    }
  };

  const handleRegenerate = async () => {
    setSelectedTemplate(null);
    setCustomization(null);
    setReasoning('');
    await handleAIGenerate();
  };

  return (
    <div className="space-y-6">
      {/* AI Generation Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>AI-Powered Landing Page Generation</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Beta
                </Badge>
              </CardTitle>
              <CardDescription>
                Let AI analyze your startup data and automatically select the perfect template with custom content
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Analysis Preview */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-sm text-gray-600">Business Model</div>
                <div className="font-semibold">{ideaData?.idea ? 'Detected' : 'Analyzing...'}</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-sm text-gray-600">Target Audience</div>
                <div className="font-semibold">{ideaData?.targetAudience || 'Analyzing...'}</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-sm text-gray-600">Generated Reports</div>
                <div className="font-semibold">{Object.keys(reports).length} Available</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <Button 
                onClick={handleAIGenerate} 
                disabled={isAnalyzing}
                className="bg-purple-600 hover:bg-purple-700 px-8"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Your Startup...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={onManualSelection}>
                Manual Selection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Results */}
      {selectedTemplate && customization && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span>AI Recommendation Ready</span>
            </CardTitle>
            <CardDescription className="text-green-700">
              AI has analyzed your startup and generated a customized landing page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template Selection Result */}
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{selectedTemplate.name}</h3>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {Math.round(confidence * 100)}% Confidence
                </Badge>
              </div>
              <p className="text-gray-600 mb-3">{selectedTemplate.description}</p>
              <div className="text-sm text-green-700 bg-green-100 p-2 rounded">
                <strong>AI Reasoning:</strong> {reasoning}
              </div>
            </div>

            {/* Content Preview */}
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <h4 className="font-semibold mb-3">Generated Content Preview</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Hero Title:</strong> {customization.fields.heroTitle}</div>
                <div><strong>Hero Subtitle:</strong> {customization.fields.heroSubtitle}</div>
                <div><strong>CTA Text:</strong> {customization.fields.ctaText}</div>
                <div><strong>Company:</strong> {customization.companyData.name}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button onClick={handleAcceptAISelection} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Use AI Recommendation
              </Button>
              <Button variant="outline" onClick={handleRegenerate}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="ghost" onClick={onManualSelection}>
                Choose Manually Instead
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How AI Generation Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">1</div>
              <div className="text-sm font-medium">Analyze Reports</div>
              <div className="text-xs text-gray-600">Extract key insights from your business analysis</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">2</div>
              <div className="text-sm font-medium">Score Templates</div>
              <div className="text-xs text-gray-600">Match templates to your business model</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
              <div className="text-sm font-medium">Generate Content</div>
              <div className="text-xs text-gray-600">Create personalized copy and messaging</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">4</div>
              <div className="text-sm font-medium">Customize Design</div>
              <div className="text-xs text-gray-600">Apply industry-appropriate colors and layouts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AILandingPageGenerator;
