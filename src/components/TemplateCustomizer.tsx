import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Palette, Layout, Type, Eye, Sparkles } from 'lucide-react';
import { LandingPageTemplate, TemplateCustomization, CustomizableField } from '@/types/template';
import { templateManager } from '@/services/templateManager';
import { aiTemplateIntelligence } from '@/services/aiTemplateIntelligence';
import AdvancedThemeBuilder from './AdvancedThemeBuilder';
import AIContentGenerator from './AIContentGenerator';

interface TemplateCustomizerProps {
  template: LandingPageTemplate;
  ideaData: any;
  onBack: () => void;
  onPreview: (customization: TemplateCustomization) => void;
  onGenerate: (customization: TemplateCustomization) => void;
}

const TemplateCustomizer = ({ template, ideaData, onBack, onPreview, onGenerate }: TemplateCustomizerProps) => {
  const [customization, setCustomization] = useState<TemplateCustomization>({
    templateId: template.id,
    fields: {},
    colorScheme: template.config.colorScheme,
    typography: template.config.typography,
    enabledSections: template.config.sections.filter(s => s.required).map(s => s.id),
    sectionVariants: {},
    animations: { ...template.config.animations },
    companyData: {
      name: ideaData?.companyName || 'Your Company',
      tagline: ideaData?.uniqueValue || 'Revolutionary solutions for modern business',
      description: ideaData?.solution || 'We provide innovative solutions to help your business grow',
      industry: ideaData?.targetAudience || 'Technology'
    },
    integrations: {}
  });

  // Initialize fields with AI-generated content
  useEffect(() => {
    const initialFields: Record<string, any> = {};
    
    template.config.customizableFields.forEach((field) => {
      // Generate AI-appropriate content based on field type and startup data
      switch (field.id) {
        case 'heroTitle':
          initialFields[field.id] = ideaData?.companyName || field.placeholder;
          break;
        case 'heroSubtitle':
          initialFields[field.id] = ideaData?.uniqueValue || field.placeholder;
          break;
        case 'ctaText':
          initialFields[field.id] = 'Get Started Free';
          break;
        case 'feature1Title':
          initialFields[field.id] = 'Powerful Analytics';
          break;
        case 'feature1Description':
          initialFields[field.id] = 'Get deep insights into your business performance with our advanced analytics dashboard';
          break;
        case 'feature2Title':
          initialFields[field.id] = 'Easy Integration';
          break;
        case 'feature2Description':
          initialFields[field.id] = 'Connect seamlessly with your existing tools and workflows in just a few clicks';
          break;
        case 'feature3Title':
          initialFields[field.id] = 'Secure & Reliable';
          break;
        case 'feature3Description':
          initialFields[field.id] = 'Enterprise-grade security with 99.9% uptime guarantee for peace of mind';
          break;
        default:
          initialFields[field.id] = field.placeholder || '';
      }
    });

    setCustomization(prev => ({
      ...prev,
      fields: initialFields
    }));
  }, [template, ideaData]);

  // Add AI-enhanced initialization
  useEffect(() => {
    const analysis = aiTemplateIntelligence.analyzeBusinessModel(
      ideaData?.idea || '', 
      ideaData?.targetAudience || ''
    );
    
    const aiContent = aiTemplateIntelligence.generateContent(
      analysis, 
      ideaData?.companyName || 'Your Company'
    );
    
    const aiModifications = aiTemplateIntelligence.suggestTemplateModifications(template, analysis);

    // Apply AI suggestions
    setCustomization(prev => ({
      ...prev,
      ...aiModifications,
      fields: {
        ...prev.fields,
        heroTitle: aiContent.heroTitle,
        heroSubtitle: aiContent.heroSubtitle,
        ctaText: aiContent.ctaTexts[0] || 'Get Started',
        ...aiContent.features.reduce((acc, feature, index) => {
          acc[`feature${index + 1}Title`] = feature.title;
          acc[`feature${index + 1}Description`] = feature.description;
          return acc;
        }, {} as Record<string, string>)
      }
    }));
  }, [template, ideaData]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setCustomization(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldId]: value
      }
    }));
  };

  const handleColorChange = (colorKey: string, value: string) => {
    setCustomization(prev => ({
      ...prev,
      colorScheme: {
        ...prev.colorScheme,
        [colorKey]: value
      }
    }));
  };

  const handleSectionToggle = (sectionId: string, enabled: boolean) => {
    setCustomization(prev => ({
      ...prev,
      enabledSections: enabled 
        ? [...prev.enabledSections, sectionId]
        : prev.enabledSections.filter(id => id !== sectionId)
    }));
  };

  const handleCompanyDataChange = (key: string, value: string) => {
    setCustomization(prev => ({
      ...prev,
      companyData: {
        ...prev.companyData,
        [key]: value
      }
    }));
  };

  const renderField = (field: CustomizableField) => {
    const value = customization.fields[field.id] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="min-h-[80px]"
          />
        );
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-12 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="flex-1"
            />
          </div>
        );
      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full"
          />
        );
    }
  };

  const groupedFields = template.config.customizableFields.reduce((acc, field) => {
    if (!acc[field.section]) {
      acc[field.section] = [];
    }
    acc[field.section].push(field);
    return acc;
  }, {} as Record<string, CustomizableField[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Sparkles className="h-3 w-3" />
                <span>AI Enhanced</span>
              </Badge>
              {template.premium && (
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onPreview(customization)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={() => onGenerate(customization)}>
            Generate Code
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customization Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="content">
                <Type className="h-4 w-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger value="design">
                <Palette className="h-4 w-4 mr-2" />
                Design
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="h-4 w-4 mr-2" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="ai-content">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Content
              </TabsTrigger>
              <TabsTrigger value="company">
                Company
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {Object.entries(groupedFields).map(([sectionName, fields]) => (
                <Card key={sectionName}>
                  <CardHeader>
                    <CardTitle className="capitalize">{sectionName} Section</CardTitle>
                    <CardDescription>
                      Customize the content for your {sectionName} section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {fields.map((field) => (
                      <div key={field.id}>
                        <Label htmlFor={field.id} className="text-sm font-medium">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div className="mt-1">
                          {renderField(field)}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <AdvancedThemeBuilder
                colorScheme={customization.colorScheme}
                typography={customization.typography}
                onColorChange={(partialColors) => setCustomization(prev => ({
                  ...prev,
                  colorScheme: { ...prev.colorScheme, ...partialColors }
                }))}
                onTypographyChange={(partialTypography) => setCustomization(prev => ({
                  ...prev,
                  typography: { ...prev.typography, ...partialTypography }
                }))}
                onSpacingChange={(spacing) => {
                  // Handle spacing changes
                  console.log('Spacing updated:', spacing);
                }}
              />
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Page Sections</CardTitle>
                  <CardDescription>
                    Enable or disable sections of your landing page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {template.config.sections.map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label className="font-medium capitalize">{section.name}</Label>
                        {section.required && (
                          <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                        )}
                      </div>
                      <Switch
                        checked={customization.enabledSections.includes(section.id)}
                        onCheckedChange={(enabled) => handleSectionToggle(section.id, enabled)}
                        disabled={section.required}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-content" className="space-y-6">
              <AIContentGenerator
                startupIdea={ideaData?.idea || ''}
                companyName={ideaData?.companyName || 'Your Company'}
                targetAudience={ideaData?.targetAudience || 'Technology professionals'}
                onContentGenerated={(content) => {
                  // Update customization with AI-generated content
                  setCustomization(prev => ({
                    ...prev,
                    fields: {
                      ...prev.fields,
                      heroTitle: content.heroTitle,
                      heroSubtitle: content.heroSubtitle,
                      ctaText: content.ctaTexts[0] || prev.fields.ctaText,
                      ...content.features.reduce((acc: Record<string, string>, feature: any, index: number) => {
                        acc[`feature${index + 1}Title`] = feature.title;
                        acc[`feature${index + 1}Description`] = feature.description;
                        return acc;
                      }, {})
                    }
                  }));
                }}
              />
            </TabsContent>

            <TabsContent value="company" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Update your company details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={customization.companyData.name}
                      onChange={(e) => handleCompanyDataChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={customization.companyData.tagline}
                      onChange={(e) => handleCompanyDataChange('tagline', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={customization.companyData.description}
                      onChange={(e) => handleCompanyDataChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={customization.companyData.industry}
                      onChange={(e) => handleCompanyDataChange('industry', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See how your landing page will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <Eye className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Preview will appear here</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => onPreview(customization)}
                  >
                    Generate Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Category:</span>
                <Badge variant="outline" className="capitalize">{template.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Complexity:</span>
                <Badge variant="outline" className="capitalize">{template.complexity}</Badge>
              </div>
              <Separator />
              <div>
                <span className="text-sm text-gray-600 block mb-2">Features:</span>
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer;
