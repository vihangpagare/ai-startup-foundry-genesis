
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Copy, RefreshCw, Sparkles, Users, Target, Award } from 'lucide-react';
import { aiTemplateIntelligence } from '@/services/aiTemplateIntelligence';

interface AIContentGeneratorProps {
  startupIdea: string;
  companyName: string;
  targetAudience: string;
  onContentGenerated: (content: Record<string, any>) => void;
}

const AIContentGenerator = ({ 
  startupIdea, 
  companyName, 
  targetAudience, 
  onContentGenerated 
}: AIContentGeneratorProps) => {
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [contentType, setContentType] = useState('all');

  const industries = [
    'technology', 'healthcare', 'finance', 'education', 'retail', 
    'manufacturing', 'consulting', 'marketing', 'real-estate', 'hospitality'
  ];

  const contentTypes = [
    { value: 'all', label: 'Complete Content Package', icon: Sparkles },
    { value: 'copy', label: 'Website Copy', icon: Wand2 },
    { value: 'testimonials', label: 'Customer Testimonials', icon: Users },
    { value: 'features', label: 'Feature Descriptions', icon: Target },
    { value: 'competitive', label: 'Competitive Analysis', icon: Award }
  ];

  const handleGenerateContent = async () => {
    setGenerating(true);
    
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysis = aiTemplateIntelligence.analyzeBusinessModel(startupIdea, targetAudience);
      const content = aiTemplateIntelligence.generateContent(analysis, companyName);
      
      setGeneratedContent(content);
      onContentGenerated(content);
    } catch (error) {
      console.error('Content generation failed:', error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateSection = (sectionType: string) => {
    // Regenerate specific section
    console.log('Regenerating:', sectionType);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5" />
            <span>AI Content Generator</span>
          </CardTitle>
          <CardDescription>
            Generate industry-specific content tailored to your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Generation Controls */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Industry Focus</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry.charAt(0).toUpperCase() + industry.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleGenerateContent}
              disabled={generating}
              className="flex items-center space-x-2"
            >
              {generating ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span>{generating ? 'Generating...' : 'Generate AI Content'}</span>
            </Button>
            
            {generatedContent && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Sparkles className="h-3 w-3" />
                <span>Content Ready</span>
              </Badge>
            )}
          </div>

          {/* Business Analysis Summary */}
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{companyName}</div>
                  <div className="text-sm text-gray-600">Company</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{targetAudience}</div>
                  <div className="text-sm text-gray-600">Target Audience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary capitalize">{selectedIndustry}</div>
                  <div className="text-sm text-gray-600">Industry</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Generated Content Display */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>
              AI-generated content ready to use in your landing page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="copy" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="copy">Website Copy</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                <TabsTrigger value="competitive">Competition</TabsTrigger>
              </TabsList>

              <TabsContent value="copy" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Hero Section</h4>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => regenerateSection('hero')}>
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Regenerate
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedContent.heroTitle)}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">{generatedContent.heroTitle}</h3>
                    <p className="text-gray-600">{generatedContent.heroSubtitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Value Proposition</h4>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedContent.valueProposition)}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p>{generatedContent.valueProposition}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Call-to-Action Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.ctaTexts.map((cta: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-white"
                        onClick={() => copyToClipboard(cta)}
                      >
                        {cta}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                {generatedContent.features.map((feature: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(`${feature.title}\n${feature.description}`)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-4">
                {generatedContent.testimonials.map((testimonial: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">•</div>
                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                            <div className="text-sm text-gray-600">•</div>
                            <div className="text-sm text-gray-600">{testimonial.company}</div>
                          </div>
                          <p className="text-gray-700 italic">"{testimonial.content}"</p>
                          <div className="flex items-center mt-2">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(testimonial.content)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="competitive" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-3 text-left">Feature</th>
                        <th className="border border-gray-200 p-3 text-left">Us</th>
                        <th className="border border-gray-200 p-3 text-left">Competitor</th>
                        <th className="border border-gray-200 p-3 text-center">Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedContent.competitorComparison.map((row: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-gray-200 p-3 font-medium">{row.feature}</td>
                          <td className="border border-gray-200 p-3 text-green-600">{row.us}</td>
                          <td className="border border-gray-200 p-3 text-gray-600">{row.competitor}</td>
                          <td className="border border-gray-200 p-3 text-center">
                            {row.advantage ? (
                              <span className="text-green-500">✓</span>
                            ) : (
                              <span className="text-red-500">✗</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIContentGenerator;
