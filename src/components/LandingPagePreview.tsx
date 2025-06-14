
import { useState, useEffect } from 'react';
import { Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPagePreviewProps {
  code: string;
}

const LandingPagePreview = ({ code }: LandingPagePreviewProps) => {
  const [sandboxUrl, setSandboxUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      createCodeSandbox();
    }
  }, [code]);

  const createCodeSandbox = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create sandbox files structure
      const files = {
        'package.json': {
          content: JSON.stringify({
            name: 'landing-page-preview',
            version: '1.0.0',
            main: 'index.js',
            dependencies: {
              'react': '^18.2.0',
              'react-dom': '^18.2.0',
              'react-scripts': '5.0.1',
              '@types/react': '^18.2.0',
              '@types/react-dom': '^18.2.0',
              'typescript': '^4.9.0',
              'tailwindcss': '^3.3.0',
              'lucide-react': '^0.263.1'
            },
            scripts: {
              start: 'react-scripts start',
              build: 'react-scripts build'
            },
            browserslist: {
              production: ['>0.2%', 'not dead', 'not op_mini all'],
              development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
            }
          }, null, 2)
        },
        'public/index.html': {
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Landing Page Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
        },
        'src/index.tsx': {
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);`
        },
        'src/App.tsx': {
          content: code
        },
        'tailwind.config.js': {
          content: `module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}`
        },
        'src/index.css': {
          content: `@tailwind base;
@tailwind components;
@tailwind utilities;`
        }
      };

      // Create sandbox using CodeSandbox API
      const response = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer csb_v1_SwU1mDZgahlkKtGy2sjlPJASCHEE9VX1OW_GlPBYkE4`
        },
        body: JSON.stringify({
          files,
          template: 'create-react-app-typescript'
        })
      });

      if (!response.ok) {
        throw new Error(`CodeSandbox API error: ${response.status}`);
      }

      const result = await response.json();
      const embedUrl = `https://codesandbox.io/embed/${result.sandbox_id}?fontsize=14&hidenavigation=1&theme=dark&view=preview`;
      setSandboxUrl(embedUrl);
      setLoading(false);
    } catch (err: any) {
      console.error('CodeSandbox creation error:', err);
      setError(err.message || 'Failed to create live preview');
      setLoading(false);
    }
  };

  const openInNewTab = () => {
    if (sandboxUrl) {
      const sandboxId = sandboxUrl.match(/\/embed\/([^?]+)/)?.[1];
      if (sandboxId) {
        window.open(`https://codesandbox.io/s/${sandboxId}`, '_blank');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Creating live React preview...</p>
          <p className="text-sm text-gray-500 mt-2">Setting up CodeSandbox environment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-red-50 rounded-lg border border-red-200">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-700 mb-4">Failed to create live preview</p>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <Button onClick={createCodeSandbox} variant="outline" className="border-red-300">
            Retry Preview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-600">Live React Preview</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={openInNewTab}
          className="flex items-center space-x-1"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open in CodeSandbox</span>
        </Button>
      </div>
      <div className="overflow-hidden">
        {sandboxUrl && (
          <iframe
            src={sandboxUrl}
            className="w-full h-[600px] border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
            title="Live Landing Page Preview"
          />
        )}
      </div>
    </div>
  );
};

export default LandingPagePreview;
