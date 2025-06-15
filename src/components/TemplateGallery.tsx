
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Star, Sparkles } from 'lucide-react';
import { LandingPageTemplate } from '@/types/template';
import { templateManager } from '@/services/templateManager';

interface TemplateGalleryProps {
  onSelectTemplate: (template: LandingPageTemplate) => void;
  businessType?: string;
  industry?: string;
}

const TemplateGallery = ({ onSelectTemplate, businessType, industry }: TemplateGalleryProps) => {
  const [templates, setTemplates] = useState<LandingPageTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<LandingPageTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [recommendations, setRecommendations] = useState<LandingPageTemplate[]>([]);

  useEffect(() => {
    const allTemplates = templateManager.getTemplates();
    setTemplates(allTemplates);
    setFilteredTemplates(allTemplates);

    // Get recommendations if business data is available
    if (businessType || industry) {
      const recommended = templateManager.recommendTemplates(
        businessType || '', 
        industry || ''
      );
      setRecommendations(recommended);
    }
  }, [businessType, industry]);

  useEffect(() => {
    let filtered = templates;

    // Apply search filter
    if (searchQuery) {
      filtered = templateManager.searchTemplates(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Apply complexity filter
    if (selectedComplexity !== 'all') {
      filtered = filtered.filter(template => template.complexity === selectedComplexity);
    }

    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory, selectedComplexity, templates]);

  const handleTemplateSelect = (template: LandingPageTemplate) => {
    onSelectTemplate(template);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'saas': return '💻';
      case 'service': return '🛠️';
      case 'ecommerce': return '🛒';
      case 'portfolio': return '🎨';
      case 'corporate': return '🏢';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Landing Page Template</h2>
        <p className="text-lg text-gray-600">
          Select from our professionally designed templates and customize it for your startup
        </p>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-purple-900">AI Recommendations</h3>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Based on your startup
            </Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {recommendations.slice(0, 3).map((template) => (
              <Card key={template.id} className="border-purple-200 hover:border-purple-300 transition-colors cursor-pointer bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                    <Button 
                      onClick={() => handleTemplateSelect(template)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Complexity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="simple">Simple</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                </div>
                <Badge className={getComplexityColor(template.complexity)}>
                  {template.complexity}
                </Badge>
              </div>
              <CardDescription className="text-base leading-relaxed">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Template Preview Placeholder */}
              <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Template Preview</span>
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {template.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.features.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => handleTemplateSelect(template)}
                className="w-full group-hover:scale-105 transition-transform"
              >
                <Eye className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or browse all templates
          </p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedComplexity('all');
            }}
            variant="outline"
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
