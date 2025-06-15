
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { TemplateCustomization } from '@/types/template';
import { templateManager } from '@/services/templateManager';
import ModernSaaSTemplate from '@/components/templates/ModernSaaSTemplate';
import MinimalPortfolioTemplate from '@/components/templates/MinimalPortfolioTemplate';
import BusinessServiceTemplate from '@/components/templates/BusinessServiceTemplate';
import EnhancedSaaSTemplate from '@/components/templates/EnhancedSaaSTemplate';
import AnalyticsSaaSTemplate from '@/components/templates/AnalyticsSaaSTemplate';

interface LandingPagePreviewProps {
  customization: TemplateCustomization | null;
  onEdit: () => void;
}

const LandingPagePreview = ({ customization, onEdit }: LandingPagePreviewProps) => {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customization) {
      generatePreview();
    }
  }, [customization]);

  const generatePreview = async () => {
    if (!customization) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating preview for customization:', customization);
      const code = templateManager.generateCustomizedCode(customization);
      console.log('Generated code length:', code.length);
      setGeneratedCode(code);
    } catch (err) {
      console.error('Error generating preview:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate preview');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCode = () => {
    if (!generatedCode) return;
    
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your landing page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Preview Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="flex space-x-2">
              <Button onClick={generatePreview} variant="outline">
                Retry
              </Button>
              <Button onClick={onEdit}>
                Back to Editor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!customization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle>No Preview Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Unable to generate preview. Please try customizing your template.
            </p>
            <Button onClick={onEdit}>
              Back to Editor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (customization.templateId) {
      case 'modern-saas':
        return <ModernSaaSTemplate customization={customization} />;
      case 'enhanced-saas':
        return <EnhancedSaaSTemplate customization={customization} />;
      case 'analytics-saas':
        return <AnalyticsSaaSTemplate customization={customization} />;
      case 'minimal-portfolio':
        return <MinimalPortfolioTemplate customization={customization} />;
      case 'business-service':
        return <BusinessServiceTemplate customization={customization} />;
      default:
        return (
          <div className="p-8 text-center">
            <p className="text-gray-600">Template not found: {customization.templateId}</p>
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
              Back to Editor
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Landing Page Preview</h2>
              <p className="text-sm text-gray-600">
                Company: {customization.companyData.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={downloadCode} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Code
            </Button>
            <Button onClick={generatePreview}>
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
                  {customization.companyData.website || 'yourcompany.com'}
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

export default LandingPagePreview;
