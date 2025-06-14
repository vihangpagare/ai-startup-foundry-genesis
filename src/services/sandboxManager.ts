
interface SandboxConfig {
  files: Record<string, { content: string }>;
  template: string;
  dependencies?: Record<string, string>;
}

interface SandboxCache {
  [codeHash: string]: {
    sandboxId: string;
    embedUrl: string;
    timestamp: number;
  };
}

export class SandboxManager {
  private static cache: SandboxCache = {};
  private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  private static readonly API_BASE = 'https://codesandbox.io/api/v1';
  private static readonly API_KEY = 'csb_v1_SwU1mDZgahlkKtGy2sjlPJASCHEE9VX1OW_GlPBYkE4';

  static async createOrUpdateSandbox(processedCode: string): Promise<{
    sandboxId: string;
    embedUrl: string;
    success: boolean;
    error?: string;
  }> {
    try {
      const codeHash = this.generateCodeHash(processedCode);
      
      // Check cache first
      const cached = this.getCachedSandbox(codeHash);
      if (cached) {
        return {
          sandboxId: cached.sandboxId,
          embedUrl: cached.embedUrl,
          success: true
        };
      }

      // Create new sandbox
      const config = this.createSandboxConfig(processedCode);
      const result = await this.createSandbox(config);
      
      if (result.success && result.sandboxId) {
        // Cache the result
        this.cacheSandbox(codeHash, result.sandboxId, result.embedUrl);
        return result;
      }

      return result;
    } catch (error) {
      console.error('Sandbox creation failed:', error);
      return {
        sandboxId: '',
        embedUrl: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private static generateCodeHash(code: string): string {
    // Simple hash function for caching
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      const char = code.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  private static getCachedSandbox(codeHash: string) {
    const cached = this.cache[codeHash];
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_DURATION) {
      return cached;
    }
    return null;
  }

  private static cacheSandbox(codeHash: string, sandboxId: string, embedUrl: string) {
    this.cache[codeHash] = {
      sandboxId,
      embedUrl,
      timestamp: Date.now()
    };
  }

  private static createSandboxConfig(code: string): SandboxConfig {
    return {
      files: {
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
              'typescript': '^5.0.0',
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
    <script>
      tailwind.config = {
        theme: {
          extend: {}
        }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
        },
        'src/index.tsx': {
          content: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);`
        },
        'src/App.tsx': {
          content: code
        },
        'src/index.css': {
          content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`
        },
        'tsconfig.json': {
          content: JSON.stringify({
            compilerOptions: {
              target: 'es5',
              lib: ['dom', 'dom.iterable', 'es6'],
              allowJs: true,
              skipLibCheck: true,
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
              strict: true,
              forceConsistentCasingInFileNames: true,
              noFallthroughCasesInSwitch: true,
              module: 'esnext',
              moduleResolution: 'node',
              resolveJsonModule: true,
              isolatedModules: true,
              noEmit: true,
              jsx: 'react-jsx'
            },
            include: ['src']
          }, null, 2)
        }
      },
      template: 'create-react-app-typescript'
    };
  }

  private static async createSandbox(config: SandboxConfig): Promise<{
    sandboxId: string;
    embedUrl: string;
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.API_BASE}/sandboxes/define?json=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify({
          files: config.files,
          template: config.template
        })
      });

      if (!response.ok) {
        throw new Error(`CodeSandbox API error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.sandbox_id) {
        throw new Error('No sandbox ID returned from API');
      }

      const embedUrl = `https://codesandbox.io/embed/${result.sandbox_id}?fontsize=14&hidenavigation=1&theme=dark&view=preview&hidedevtools=1`;
      
      return {
        sandboxId: result.sandbox_id,
        embedUrl,
        success: true
      };
    } catch (error) {
      console.error('Sandbox API error:', error);
      return {
        sandboxId: '',
        embedUrl: '',
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create sandbox'
      };
    }
  }

  static clearCache() {
    this.cache = {};
  }

  static getCacheStats() {
    const entries = Object.keys(this.cache).length;
    const validEntries = Object.values(this.cache)
      .filter(entry => (Date.now() - entry.timestamp) < this.CACHE_DURATION)
      .length;
    
    return { total: entries, valid: validEntries };
  }
}
