
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';
import AdvancedSaaSDashboardTemplate from '@/components/templates/AdvancedSaaSDashboardTemplate';
import ModernEcommerceTemplate from '@/components/templates/ModernEcommerceTemplate';
import BusinessPlatformTemplate from '@/components/templates/BusinessPlatformTemplate';

interface AppPreviewProps {
  customization: AppCustomization | null;
  onEdit: () => void;
}

const AppPreview = ({ customization, onEdit }: AppPreviewProps) => {
  console.log('AppPreview rendering with customization:', customization?.templateId);

  if (!customization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>No Preview Available</span>
            </CardTitle>
            <CardDescription className="text-orange-700">
              Unable to generate preview. The app customization data is missing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-4">
              This might be due to a generation error or missing startup data. Please try regenerating your app.
            </p>
            <Button onClick={onEdit} className="bg-orange-600 hover:bg-orange-700 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Back to Generator
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Template ID mapping for backward compatibility
  const getTemplateComponent = (templateId: string) => {
    // Map legacy template IDs to current ones
    const templateIdMap: Record<string, string> = {
      'modern-ecommerce': 'modern-ecommerce-platform',
      'business-service': 'business-service-platform',
      'advanced-saas': 'advanced-saas-dashboard'
    };

    const normalizedTemplateId = templateIdMap[templateId] || templateId;
    
    console.log('Rendering template:', normalizedTemplateId, 'Original:', templateId);
    
    switch (normalizedTemplateId) {
      case 'advanced-saas-dashboard':
        return <AdvancedSaaSDashboardTemplate customization={customization} />;
      case 'modern-ecommerce-platform':
        return <ModernEcommerceTemplate customization={customization} />;
      case 'business-service-platform':
        return <BusinessPlatformTemplate customization={customization} />;
      default:
        console.error('Unknown template ID:', normalizedTemplateId);
        return (
          <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Template Not Found</h3>
            <p className="text-red-700 mb-4">
              Template "{templateId}" is not supported or available.
            </p>
            <p className="text-sm text-red-600 mb-4">
              Available templates: advanced-saas-dashboard, modern-ecommerce-platform, business-service-platform
            </p>
            <Button onClick={onEdit} variant="outline" className="border-red-300 text-red-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Different Template
            </Button>
          </div>
        );
    }
  };

  const renderTemplate = () => {
    try {
      return getTemplateComponent(customization.templateId);
    } catch (error) {
      console.error('Template rendering error:', error);
      return (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Rendering Error</h3>
          <p className="text-red-700 mb-4">
            Failed to render the template: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <Button onClick={onEdit} variant="outline" className="border-red-300 text-red-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Back to Generator
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Preview Controls */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <div className="flex items-center space-x-4">
            <Button onClick={onEdit} variant="outline" className="border-gray-300 hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Generator
            </Button>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-900">Live App Preview</h2>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">
                App: {customization.appName || 'Feature-Centric Dashboard'} • Template: {customization.templateId}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New App
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Preview Content */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600 border">
                  <span className="text-gray-400">🔒</span>
                  <span className="ml-2">{customization.appName?.toLowerCase().replace(/\s+/g, '-') || 'your-app'}.com</span>
                </div>
                <div className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
                  LIVE PREVIEW
                </div>
              </div>
            </div>
            
            {/* Template Content */}
            <div className="w-full overflow-hidden">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
