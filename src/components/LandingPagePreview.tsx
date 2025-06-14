
import { useState, useEffect } from 'react';
import { Loader2, ExternalLink, AlertCircle, RefreshCw, CheckCircle, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodeProcessor } from '@/services/codeProcessor';
import { SandboxManager } from '@/services/sandboxManager';

interface LandingPagePreviewProps {
  code: string;
}

const LandingPagePreview = ({ code }: LandingPagePreviewProps) => {
  const [sandboxUrl, setSandboxUrl] = useState<string>('');
  const [sandboxId, setSandboxId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingResults, setProcessingResults] = useState<{
    errors: string[];
    warnings: string[];
  }>({ errors: [], warnings: [] });
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    if (code) {
      console.log('LandingPagePreview: Received code, length:', code.length);
      processAndCreateSandbox();
    }
  }, [code]);

  const processAndCreateSandbox = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo('Starting code processing...');

    try {
      console.log('Processing code for sandbox...');
      
      // Step 1: Process the code
      const processingResult = CodeProcessor.processReactCode(code);
      console.log('Processing result:', {
        errors: processingResult.errors,
        warnings: processingResult.warnings,
        codeLength: processingResult.processedCode.length
      });
      
      setProcessingResults({
        errors: processingResult.errors,
        warnings: processingResult.warnings
      });

      setDebugInfo(`Code processed. Errors: ${processingResult.errors.length}, Warnings: ${processingResult.warnings.length}`);

      // Step 2: If there are critical errors, don't proceed
      if (processingResult.errors.length > 0) {
        const errorMsg = `Code processing errors: ${processingResult.errors.join(', ')}`;
        console.error('Critical processing errors:', processingResult.errors);
        setError(errorMsg);
        setLoading(false);
        return;
      }

      setDebugInfo('Creating sandbox...');

      // Step 3: Create or get cached sandbox
      const sandboxResult = await SandboxManager.createOrUpdateSandbox(processingResult.processedCode);
      console.log('Sandbox result:', sandboxResult);

      if (sandboxResult.success) {
        setSandboxUrl(sandboxResult.embedUrl);
        setSandboxId(sandboxResult.sandboxId);
        setDebugInfo(`Sandbox created successfully: ${sandboxResult.sandboxId}`);
      } else {
        throw new Error(sandboxResult.error || 'Failed to create sandbox');
      }
      
      setLoading(false);
    } catch (err: any) {
      console.error('Preview creation error:', err);
      setError(err.message || 'Failed to create live preview');
      setDebugInfo(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  const openInNewTab = () => {
    if (sandboxId) {
      window.open(`https://codesandbox.io/s/${sandboxId}`, '_blank');
    }
  };

  const openInEditor = () => {
    if (sandboxId) {
      window.open(`https://codesandbox.io/s/${sandboxId}?file=/src/App.tsx`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-700 font-medium">Processing React Code...</p>
          <p className="text-sm text-gray-500 mt-2">Validating • Optimizing • Creating Live Environment</p>
          {debugInfo && (
            <p className="text-xs text-gray-400 mt-2 bg-gray-100 px-3 py-1 rounded">{debugInfo}</p>
          )}
          <div className="mt-4 flex justify-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Code Processing
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Sandbox Creation
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[600px] bg-red-50 rounded-lg border border-red-200 p-6">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Preview Generation Failed</h3>
          <p className="text-red-700 mb-4">{error}</p>
          
          {debugInfo && (
            <div className="bg-red-100 rounded-lg p-4 mb-4 text-left">
              <h4 className="font-medium text-red-800 mb-2">Debug Information:</h4>
              <p className="text-sm text-red-700">{debugInfo}</p>
            </div>
          )}
          
          {processingResults.errors.length > 0 && (
            <div className="bg-red-100 rounded-lg p-4 mb-4 text-left">
              <h4 className="font-medium text-red-800 mb-2">Code Processing Errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {processingResults.errors.map((err, index) => (
                  <li key={index}>• {err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-center space-x-3">
            <Button onClick={processAndCreateSandbox} variant="outline" className="border-red-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Preview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Live React Execution</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {processingResults.warnings.length > 0 && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                {processingResults.warnings.length} Warning{processingResults.warnings.length > 1 ? 's' : ''}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              TypeScript Ready
            </Badge>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={openInEditor}
                className="flex items-center space-x-1 text-xs"
              >
                <Code className="h-3 w-3" />
                <span>Edit Code</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={openInNewTab}
                className="flex items-center space-x-1 text-xs"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Open Full</span>
              </Button>
            </div>
          </div>
        </div>
        
        {processingResults.warnings.length > 0 && (
          <div className="mt-2 bg-yellow-50 rounded p-2">
            <p className="text-xs text-yellow-800 font-medium mb-1">Code Warnings:</p>
            <ul className="text-xs text-yellow-700 space-y-1">
              {processingResults.warnings.slice(0, 3).map((warning, index) => (
                <li key={index}>• {warning}</li>
              ))}
              {processingResults.warnings.length > 3 && (
                <li>• ... and {processingResults.warnings.length - 3} more</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Live Preview */}
      <div className="relative">
        {sandboxUrl && (
          <iframe
            src={sandboxUrl}
            className="w-full h-[600px] border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-downloads"
            title="Live React Landing Page Preview"
            loading="lazy"
            onLoad={() => console.log('Sandbox iframe loaded successfully')}
            onError={(e) => console.error('Sandbox iframe error:', e)}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPagePreview;
