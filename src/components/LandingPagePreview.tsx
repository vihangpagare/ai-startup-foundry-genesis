
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LandingPagePreviewProps {
  code: string;
}

const LandingPagePreview = ({ code }: LandingPagePreviewProps) => {
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      // Extract component content and create a preview
      try {
        // Convert React/TypeScript code to a preview format
        const previewContent = generatePreviewFromCode(code);
        setPreviewHtml(previewContent);
        setLoading(false);
      } catch (error) {
        console.error('Preview generation error:', error);
        setLoading(false);
      }
    }
  }, [code]);

  const generatePreviewFromCode = (reactCode: string): string => {
    // Extract key information from the React code for preview
    const companyName = extractValue(reactCode, /company[\\s]*[=:][\\s]*['"](.*?)['"]/) || 'SaaS Startup';
    const headline = extractValue(reactCode, /headline[\\s]*[=:][\\s]*['"](.*?)['"]/) || 'Revolutionary SaaS Solution';
    const description = extractValue(reactCode, /description[\\s]*[=:][\\s]*['"](.*?)['"]/) || 'Transform your business with our innovative platform';
    
    return `
      <div style="font-family: system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 2rem;">
        <!-- Hero Section -->
        <div style="max-width: 1200px; margin: 0 auto; text-align: center; color: white;">
          <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            ${headline}
          </h1>
          <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto;">
            ${description}
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              Get Started Free
            </button>
            <button style="background: transparent; color: white; padding: 1rem 2rem; border: 2px solid white; border-radius: 8px; font-weight: 600; cursor: pointer;">
              Watch Demo
            </button>
          </div>
        </div>

        <!-- Features Section -->
        <div style="max-width: 1200px; margin: 4rem auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px);">
            <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">🚀 Easy Setup</h3>
            <p style="color: rgba(255,255,255,0.8);">Get started in minutes with our intuitive onboarding process.</p>
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px);">
            <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">⚡ Fast Performance</h3>
            <p style="color: rgba(255,255,255,0.8);">Lightning-fast processing with enterprise-grade reliability.</p>
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px);">
            <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">🔒 Secure</h3>
            <p style="color: rgba(255,255,255,0.8);">Bank-level security with end-to-end encryption.</p>
          </div>
        </div>

        <!-- CTA Section -->
        <div style="max-width: 600px; margin: 4rem auto; text-align: center; background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 16px; backdrop-filter: blur(10px);">
          <h2 style="color: white; font-size: 2rem; margin-bottom: 1rem;">Ready to Get Started?</h2>
          <p style="color: rgba(255,255,255,0.8); margin-bottom: 2rem;">Join thousands of companies already using ${companyName}</p>
          <button style="background: white; color: #667eea; padding: 1rem 3rem; border: none; border-radius: 8px; font-weight: 600; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            Start Free Trial
          </button>
        </div>
      </div>
    `;
  };

  const extractValue = (code: string, regex: RegExp): string | null => {
    const match = code.match(regex);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Generating preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-4 text-sm text-gray-600">Landing Page Preview</span>
      </div>
      <div className="overflow-hidden">
        <iframe
          srcDoc={previewHtml}
          className="w-full h-[600px] border-0"
          sandbox="allow-scripts"
          title="Landing Page Preview"
        />
      </div>
    </div>
  );
};

export default LandingPagePreview;
