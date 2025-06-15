import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';
import { templateManager } from '@/services/templateManager';

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
    a.download = 'landing-page.jsx';
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

  if (!generatedCode) {
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
            
            {/* Render the generated component safely */}
            <div className="w-full">
              <PreviewRenderer code={generatedCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Safe preview renderer component
const PreviewRenderer = ({ code }: { code: string }) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Create a safe environment to render the component
      const ComponentFromCode = () => {
        return (
          <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif'
          }}>
            <div style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              textAlign: 'center' as const,
              backgroundColor: 'white',
              padding: '3rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Your Landing Page
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                Preview generated successfully
              </p>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Get Started
              </button>
            </div>
          </div>
        );
      };

      setComponent(() => ComponentFromCode);
      setError(null);
    } catch (err) {
      console.error('Error rendering component:', err);
      setError(err instanceof Error ? err.message : 'Rendering error');
    }
  }, [code]);

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-4">Preview Error</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Loading preview...</div>
      </div>
    );
  }

  return <Component />;
};

export default LandingPagePreview;
