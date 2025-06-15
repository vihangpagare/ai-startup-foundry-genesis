
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';
import AdvancedSaaSDashboardTemplate from '@/components/templates/AdvancedSaaSDashboardTemplate';
import ModernEcommerceTemplate from '@/components/templates/ModernEcommerceTemplate';
import BusinessPlatformTemplate from '@/components/templates/BusinessPlatformTemplate';

interface AppPreviewProps {
  customization: AppCustomization | null;
  onEdit: () => void;
}

const AppPreview = ({ customization, onEdit }: AppPreviewProps) => {
  if (!customization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle>No Preview Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Unable to generate preview. Please try customizing your app template.
            </p>
            <Button onClick={onEdit}>
              Back to Generator
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (customization.templateId) {
      case 'advanced-saas-dashboard':
        return <AdvancedSaaSDashboardTemplate customization={customization} />;
      case 'modern-ecommerce-platform':
        return <ModernEcommerceTemplate customization={customization} />;
      case 'business-service-platform':
        return <BusinessPlatformTemplate customization={customization} />;
      default:
        return (
          <div className="p-8 text-center">
            <p className="text-gray-600">Template not found: {customization.templateId}</p>
            <p className="text-sm text-gray-500 mt-2">
              This template may not be supported yet.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button onClick={onEdit} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Generator
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">App Preview</h2>
              <p className="text-sm text-gray-600">
                App: {customization.appName || 'Unnamed App'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={onEdit}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 ml-4">
                  {customization.appName || 'your-app.com'}
                </span>
              </div>
            </div>
            
            {/* Render the actual template component */}
            <div className="w-full">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
